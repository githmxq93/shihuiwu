/**
 * 使用引导进度（单一主键 + 版本号）
 * ---------------------------------------------------------------------------
 * 设计口径（_design/onboarding/index.html 第 03 章）：
 *   · 只用一个 storage 键，避免 10 个功能键散落；
 *   · 版本号进键名（shw_guide_v1），升级版本号 = 旧记录自然失效、整体重触发；
 *   · global 记全站引导，features 按功能 key 分项记 { done, at }；
 *   · 「跳过」与「看完」都写 done=true；中断（切后台 / 返回）不写，下次重来；
 *   · 「重看」不改 done / at，只在 REPLAY_KEY 里留一个一次性标记，由目标页消费。
 *
 * 本模块不依赖页面与组件，任何页面都可以直接 require。
 */

const VERSION = 1;
const STORAGE_KEY = 'shw_guide_v' + VERSION;
const REPLAY_KEY = 'shw_guide_replay_v' + VERSION;
// 重看标记有效期（10 分钟）：标记只应服务「我的 → 使用指南 → 跳目标页」这一次跳转。
// 未登录时点重看会留在本机，若永不过期，用户过很久登录后进页会莫名弹出引导。
// 超期标记在读取/消费时顺手删除，相当于没点过。
const REPLAY_TTL = 10 * 60 * 1000;

// 旧版本键只清理一次，避免每次读取都扫 storage
let _legacyCleared = false;

function hasStorage() {
  return typeof wx !== 'undefined' && typeof wx.getStorageSync === 'function';
}

function blankState() {
  return { v: VERSION, global: { done: false, at: 0 }, features: {} };
}

function normalizeEntry(raw) {
  if (!raw || typeof raw !== 'object') return { done: false, at: 0 };
  return {
    done: raw.done === true,
    at: typeof raw.at === 'number' ? raw.at : 0
  };
}

/** 读取完整状态；结构异常时回退为空状态，不让脏数据把引导永久锁死 */
function read() {
  if (!hasStorage()) return blankState();
  let raw = null;
  try {
    raw = wx.getStorageSync(STORAGE_KEY);
  } catch (e) {
    raw = null;
  }
  const state = blankState();
  if (raw && typeof raw === 'object') {
    state.global = normalizeEntry(raw.global);
    if (raw.features && typeof raw.features === 'object') {
      Object.keys(raw.features).forEach((key) => {
        state.features[key] = normalizeEntry(raw.features[key]);
      });
    }
  }
  return state;
}

function write(state) {
  if (!hasStorage()) return;
  try {
    wx.setStorageSync(STORAGE_KEY, state);
  } catch (e) {
    // 存储失败不影响本次展示；下次进入最多再出现一次
  }
}

function entryOf(state, key) {
  if (key === 'global') return state.global;
  return state.features[key] || { done: false, at: 0 };
}

/** 该功能是否还需要自动出现 */
function shouldShow(key) {
  if (!key) return false;
  return !entryOf(read(), key).done;
}

function isDone(key) {
  if (!key) return false;
  return entryOf(read(), key).done;
}

/**
 * 记为已完成（看完或跳过都算）。重复调用只刷新时间戳。
 * @param {string} key 'global' 或 guide-steps.js 里的功能 key
 */
function markDone(key) {
  if (!key || !hasStorage()) return;
  const state = read();
  const entry = { done: true, at: Date.now() };
  if (key === 'global') state.global = entry;
  else state.features[key] = entry;
  write(state);
}

/**
 * 清除某个功能的完成标记（调试 / 内部复位用）。
 * 普通用户的重看走 requestReplay，不会清空完成记录。
 */
function reset(key) {
  if (!key || !hasStorage()) return;
  const state = read();
  const entry = { done: false, at: 0 };
  if (key === 'global') state.global = entry;
  else state.features[key] = entry;
  write(state);
}

/** 在「我的 → 使用指南」点重看：留一个一次性标记，目标页 autoStart 时消费 */
function requestReplay(key) {
  if (!key || !hasStorage()) return;
  try {
    wx.setStorageSync(REPLAY_KEY, { key: key, at: Date.now() });
  } catch (e) {}
}

/** 标记是否仍有效：key 匹配且未超过 TTL；过期或没有时间戳的旧标记顺手清掉 */
function replayAlive(raw, key) {
  if (!raw || raw.key !== key) return false;
  const at = typeof raw.at === 'number' ? raw.at : 0;
  if (!at || Date.now() - at > REPLAY_TTL) {
    try {
      wx.removeStorageSync(REPLAY_KEY);
    } catch (e) {}
    return false;
  }
  return true;
}

/** 是否有待消费的重看标记（只读，不消费） */
function hasReplay(key) {
  if (!key || !hasStorage()) return false;
  try {
    return replayAlive(wx.getStorageSync(REPLAY_KEY), key);
  } catch (e) {
    return false;
  }
}

/** 消费重看标记：命中且未过期才返回 true，并立即删除，保证只弹一次 */
function consumeReplay(key) {
  if (!key || !hasStorage()) return false;
  try {
    if (replayAlive(wx.getStorageSync(REPLAY_KEY), key)) {
      wx.removeStorageSync(REPLAY_KEY);
      return true;
    }
  } catch (e) {}
  return false;
}

/**
 * 列出若干功能的完成状态（我的 → 使用指南抽屉用）。
 * @param {Array<string>} keys
 * @returns {Array<{key:string, done:boolean, at:number}>}
 */
function list(keys) {
  const state = read();
  return (keys || []).map((key) => {
    const entry = entryOf(state, key);
    return { key: key, done: entry.done, at: entry.at };
  });
}

/** 删除历史版本键（v1 → v2 时旧记录不再参与判断） */
function clearLegacy() {
  if (_legacyCleared || !hasStorage()) return;
  _legacyCleared = true;
  try {
    if (typeof wx.getStorageInfoSync !== 'function') return;
    const info = wx.getStorageInfoSync();
    const keys = (info && info.keys) || [];
    keys.forEach((key) => {
      if (/^shw_guide_v\d+$/.test(key) && key !== STORAGE_KEY) {
        wx.removeStorageSync(key);
      }
    });
  } catch (e) {}
}

clearLegacy();

module.exports = {
  VERSION,
  STORAGE_KEY,
  REPLAY_KEY,
  REPLAY_TTL,
  shouldShow,
  isDone,
  markDone,
  reset,
  requestReplay,
  hasReplay,
  consumeReplay,
  list,
  clearLegacy
};
