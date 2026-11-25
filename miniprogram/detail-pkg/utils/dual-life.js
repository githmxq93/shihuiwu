/**
 * detail-pkg/utils/dual-life.js —— 「双人生命线」数据层（纯函数，不依赖 wx / 页面）
 *
 * [2026-11-15] 从 miniprogram/utils/ 挪入 detail-pkg/utils/：只有 detail / dual 两个
 * 分包页引用它，留在主包会被微信「上传前检查」判为「主包内不应存在主包未使用的JS文件」。
 * 分包内引用写 `../../utils/dual-life`，不要改回主包路径。
 *
 * 职责：
 *   1. 解析库里的中文生卒年（纯数字 / 带「年」/ 带「约」/ 公元前 / 负数）；
 *   2. 按 D 规格把一个人的生卒归为四档缺失态：双全 / 约数 / 仅一端 / 双缺；
 *   3. 计算两人的并存区间、年龄差、晚走年数，以及作图的年份坐标系；
 *   4. 合并两人在并存区间内的事件（不编造，只取库里有年份的条目）。
 *
 * 设计约束（与 _design/dual-timeline/d-missing-states.html 一致）：
 *   · 双端齐全 → 实线；带「约」→ 虚线 + 空心端点；只一端 → 开口渐隐；
 *   · 两端皆缺 → 不画线、不比对，标「待补」；
 *   · 缺失端绝不按 0 岁或「至今」补算；
 *   · 约数不参与精确排名，凡涉及约数的数字统一带「约」。
 *
 * [注意] 本模块被 detail 页与 dual 页共用，改动会影响两处展示；
 *   对外只暴露下面 module.exports 里的函数。
 */

/* ===================== 一、年份解析 ===================== */

/**
 * 解析一个生卒年字段。
 * @param {string|number} raw 库里的原始值（701 / '701' / '701年' / '约前571' / '公元前551年'）
 * @returns {{value:number, approx:boolean, bc:boolean, text:string}|null}
 *          value 为可比较的整数（公元前为负数）；无法定年返回 null
 */
function parseYear(raw) {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === 'number') {
    if (!isFinite(raw) || raw === 0) return null;
    var n = Math.round(raw);
    return {
      value: n,
      approx: false,
      bc: n < 0,
      text: n < 0 ? '前' + (-n) : String(n)
    };
  }
  var s = String(raw).replace(/\s+/g, '');
  if (!s) return null;
  var approx = s.indexOf('约') >= 0;

  // 公元前 / 简写「前571」：统一转成负数，展示保留「约前571」
  var bc = s.match(/(?:公元前|前)(\d{1,5})/);
  if (bc) {
    var v = -parseInt(bc[1], 10);
    if (!v) return null;
    return { value: v, approx: approx, bc: true, text: (approx ? '约' : '') + '前' + bc[1] };
  }

  // 公元 / 纯数字 / 数字带「年」；年号干支（建安十三年、明代）没有数字 → null
  var m = s.match(/(\d{1,5})(?:年)?/);
  if (!m) return null;
  var num = parseInt(m[1], 10);
  if (!num) return null;
  return { value: num, approx: approx, bc: false, text: (approx ? '约' : '') + String(num) };
}

/** 年份数字 → 展示文本（-551 → 前551；1037 → 1037） */
function yearLabel(n) {
  if (n === null || n === undefined || !isFinite(n)) return '—';
  return n < 0 ? '前' + (-n) : String(n);
}

/* ===================== 二、单人生卒与缺失态 ===================== */

/**
 * 把 figure 的生卒归一成一份可直接渲染的生命跨度。
 * @param {object} figure 需含 birthYear / deathYear（可为数字或中文串）
 * @returns {object} 见下方字段注释
 */
function lifeOf(figure) {
  var f = figure || {};
  var birth = parseYear(f.birthYear);
  var death = parseYear(f.deathYear);
  var approx = !!(birth && death && (birth.approx || death.approx));

  var state;
  if (birth && death) state = approx ? 'approx' : 'full';
  else if (birth) state = 'birthOnly';
  else if (death) state = 'deathOnly';
  else state = 'none';

  var span = null;
  if (birth && death && death.value >= birth.value) span = death.value - birth.value;

  var yearsText;
  if (birth && death) yearsText = birth.text + ' — ' + death.text;
  else if (birth) yearsText = birth.text + ' — 卒年未载';
  else if (death) yearsText = '生年不详 — ' + death.text;
  else yearsText = '生卒待补';

  var spanText;
  if (span === null) spanText = '—';
  else spanText = (approx ? '约 ' : '') + span;

  return {
    name: String(f.name || ''),
    birth: birth,
    death: death,
    state: state,
    hasBoth: !!(birth && death),
    approx: approx,
    span: span,              // 享年（生卒差，未计虚岁）
    spanText: spanText,
    yearsText: yearsText,
    // 缺失态标签，供 UI 小签显示
    stateLabel: state === 'full' ? '生卒俱全'
      : state === 'approx' ? '约数'
        : state === 'birthOnly' ? '仅生年'
          : state === 'deathOnly' ? '仅卒年' : '双缺'
  };
}

/* ===================== 三、两人比对 ===================== */

/**
 * 计算两人的并存区间、年龄差、晚走年数，并给出作图用的年份域。
 * @returns {object}
 *   ok            两人是否至少各有一个年份（可以画图）
 *   status        full（双方生卒俱全）/ partial（至少一方缺一端）/ none（有一方双缺）
 *   overlap       并存年数；仅 full 时有值
 *   hasOverlap    是否存在正数并存区间（full 且区间相交）
 *   approx        任一已知端点带「约」
 *   diff          出生年差
 *   earlySide     'a' | 'b'（先出生者）
 *   survivorSide  'a' | 'b'（晚走者）
 *   survivorYears 两人卒年差
 *   domain        年份域 { start, end }，作图映射用
 */
function compareLife(figA, figB) {
  var A = lifeOf(figA);
  var B = lifeOf(figB);
  var fullBoth = !!(A.birth && A.death && B.birth && B.death);
  var anyA = !!(A.birth || A.death);
  var anyB = !!(B.birth || B.death);

  var res = {
    a: A,
    b: B,
    status: fullBoth ? 'full' : (anyA && anyB ? 'partial' : 'none'),
    ok: !!(anyA && anyB),
    approx: !!(A.approx || B.approx ||
      (A.birth && A.birth.approx) || (A.death && A.death.approx) ||
      (B.birth && B.birth.approx) || (B.death && B.death.approx)),
    overlap: null,
    hasOverlap: false,
    diff: null,
    earlySide: null,
    survivorSide: null,
    survivorYears: null,
    spanA: A.span,
    spanB: B.span,
    ratioA: null,
    ratioB: null,
    domain: null
  };

  if (!res.ok) {
    // D ⑤：两端皆缺 → 不画线、不比对
    return res;
  }

  if (fullBoth) {
    // 出生差：先出生者为 early
    if (A.birth.value <= B.birth.value) {
      res.earlySide = 'a';
      res.diff = B.birth.value - A.birth.value;
    } else {
      res.earlySide = 'b';
      res.diff = A.birth.value - B.birth.value;
    }
    // 卒年差：先走者决定「晚走 N 年」
    if (A.death.value <= B.death.value) {
      res.survivorSide = 'b';
      res.survivorYears = B.death.value - A.death.value;
    } else {
      res.survivorSide = 'a';
      res.survivorYears = A.death.value - B.death.value;
    }
    // 并存区间
    var start = Math.max(A.birth.value, B.birth.value);
    var end = Math.min(A.death.value, B.death.value);
    res.overlap = Math.max(0, end - start);
    res.hasOverlap = res.overlap > 0;
    if (res.hasOverlap) {
      if (res.spanA && res.spanA > 0) res.ratioA = Math.round(res.overlap / res.spanA * 100);
      if (res.spanB && res.spanB > 0) res.ratioB = Math.round(res.overlap / res.spanB * 100);
    }
  }

  // 年份域：full 用「最早生—最晚卒」+ 少量留白；partial 用所有已知年 + 较大留白
  var minBirth = null;
  var maxDeath = null;
  if (fullBoth) {
    minBirth = Math.min(A.birth.value, B.birth.value);
    maxDeath = Math.max(A.death.value, B.death.value);
  } else {
    var known = [];
    [A.birth, A.death, B.birth, B.death].forEach(function (p) {
      if (p) known.push(p.value);
    });
    minBirth = Math.min.apply(null, known);
    maxDeath = Math.max.apply(null, known);
  }
  var range = maxDeath - minBirth;
  var pad = fullBoth
    ? Math.max(2, Math.round(range * 0.045))
    : Math.max(12, Math.round((range || 0) * 0.2));
  if (!fullBoth && range === 0) pad = 30;
  res.domain = { start: minBirth - pad, end: maxDeath + pad };

  return res;
}

/** 年份 → 在年份域内的百分比（0~100，保留两位小数，供内联样式使用） */
function pct(year, domain) {
  if (year === null || year === undefined || !domain) return 0;
  var span = domain.end - domain.start;
  if (!span) return 0;
  var p = (year - domain.start) / span * 100;
  if (p < 0) p = 0;
  if (p > 100) p = 100;
  return Math.round(p * 100) / 100;
}

/**
 * 生成双轨图的位置模型（A 视图与分享卡共用）。
 * @returns {object} rows / band / ticks / bracket / deathMark
 */
function buildPlotModel(cmp) {
  var A = cmp.a;
  var B = cmp.b;
  var D = cmp.domain;
  if (!D) return null;

  var rows = [];
  rows.push(makeRow('a', A, D, cmp.domain));
  rows.push(makeRow('b', B, D, cmp.domain));

  var band = null;
  if (cmp.hasOverlap) {
    var bs = Math.max(A.birth.value, B.birth.value);
    var be = Math.min(A.death.value, B.death.value);
    band = {
      left: pct(bs, D),
      width: Math.max(0.5, pct(be, D) - pct(bs, D)),
      label: '同在 ' + cmp.overlap + ' 年'
    };
  }

  var bracket = null;
  if (cmp.earlySide && cmp.diff !== null) {
    var early = cmp.earlySide === 'a' ? A : B;
    var late = cmp.earlySide === 'a' ? B : A;
    var l = pct(early.birth.value, D);
    var r = pct(late.birth.value, D);
    bracket = { left: l, width: Math.max(0, r - l), label: '早 ' + cmp.diff + ' 年' };
  }

  var deathMark = null;
  if (cmp.status === 'full' && cmp.survivorSide) {
    var firstOut = cmp.survivorSide === 'a' ? B : A;
    var stay = cmp.survivorSide === 'a' ? A : B;
    var age = stay.birth ? (firstOut.death.value - stay.birth.value) : null;
    deathMark = {
      left: pct(firstOut.death.value, D),
      label: yearLabel(firstOut.death.value) + ' ' + (firstOut.name || '') + '卒' +
        (age !== null ? ' · ' + (stay.name || '') + ' ' + age + ' 岁' : '')
    };
  }

  return {
    rows: rows,
    band: band,
    ticks: makeTicks(D),
    bracket: bracket,
    deathMark: deathMark
  };
}

/** 单条生命线：位置、开口方向、是否虚线 */
function makeRow(side, life, domain) {
  var startYear = life.birth ? life.birth.value : domain.start;
  var endYear = life.death ? life.death.value : domain.end;
  return {
    side: side,
    left: pct(startYear, domain),
    width: Math.max(0.5, pct(endYear, domain) - pct(startYear, domain)),
    openLeft: !life.birth,
    openRight: !life.death,
    dotted: life.approx,
    colorA: side === 'a',
    label: life.yearsText,
    age: life.spanText
  };
}

/** 刻度：4~6 个整年，覆盖整个年份域 */
function makeTicks(domain) {
  var span = domain.end - domain.start;
  if (!span) return [];
  var rough = span / 4;
  var steps = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 2000];
  var step = steps[steps.length - 1];
  for (var i = 0; i < steps.length; i++) {
    if (steps[i] >= rough) { step = steps[i]; break; }
  }
  var ticks = [];
  var first = Math.ceil(domain.start / step) * step;
  for (var y = first; y <= domain.end && ticks.length < 8; y += step) {
    ticks.push({ left: pct(y, domain), label: yearLabel(y) });
  }
  return ticks;
}

/* ===================== 四、事件合并（不编造） ===================== */

/**
 * 从两人年表里取「并存区间内」的事件，按年份合并排序。
 * @param {object} figA / figB 需含 name、events（已过 formatEventYears）
 * @param {object} cmp compareLife 结果
 * @param {number} [limit] 最多返回条数，0/不传 = 全部
 * @returns {Array} [{ key, year, yearLabel, title, desc, location, side, ageA, ageB }]
 */
function collectOverlapEvents(figA, figB, cmp, limit) {
  if (!cmp || !cmp.hasOverlap) return [];
  var start = Math.max(cmp.a.birth.value, cmp.b.birth.value);
  var end = Math.min(cmp.a.death.value, cmp.b.death.value);
  var out = [];
  var seen = {};
  // 同一年里两人各自记了同一件事（如「洛阳初见杜甫」/「洛阳初见李白」）：
  // 去掉两人的姓名后再比标题，避免合并后的时间线出现重复条目。
  var names = [cmp.a.name || '', cmp.b.name || ''];
  function cleanTitle(title) {
    var s = String(title || '');
    for (var i = 0; i < names.length; i++) {
      if (names[i]) s = s.split(names[i]).join('');
    }
    s = s.replace(/[·、，,。：:\s]/g, '');
    return s || String(title || '');
  }

  function push(fig, side) {
    var events = (fig && fig.events) || [];
    for (var i = 0; i < events.length; i++) {
      var ev = events[i];
      if (!ev || typeof ev !== 'object') continue;
      var y = parseYear(ev.year);
      if (!y || y.value < start || y.value > end) continue;
      var key = y.value + '|' + cleanTitle(ev.title);
      if (seen[key]) continue;
      seen[key] = 1;
      out.push({
        key: key,
        year: y.value,
        yearLabel: yearLabel(y.value),
        title: String(ev.title || ''),
        desc: String(ev.description || ''),
        location: String(ev.location || ''),
        side: side,
        // 年龄各按自己的生年算；缺生年的留 null，不按 0 补
        ageA: cmp.a.birth ? y.value - cmp.a.birth.value : null,
        ageB: cmp.b.birth ? y.value - cmp.b.birth.value : null
      });
    }
  }
  push(figA, 'a');
  push(figB, 'b');

  out.sort(function (x, y2) {
    if (x.year !== y2.year) return x.year - y2.year;
    return String(x.title).localeCompare(String(y2.title));
  });
  if (limit && limit > 0) out = out.slice(0, limit);
  return out;
}

/* ===================== 五、B 视图 · 三段人生 ===================== */

/**
 * 按真实区间切三段：只有先出生者 / 同在一世 / 只剩晚走者。
 * 每段文案只取该段内的真实事件，没有事件就明确写「暂未收录」，不写叙事假文。
 * @returns {Array|null} 无法计算（缺年份或没有并存区间）返回 null
 */
function buildActs(figA, figB, cmp) {
  if (!cmp || cmp.status !== 'full') return null;
  if (!cmp.hasOverlap) return null;

  var A = cmp.a;
  var B = cmp.b;
  var earlyIsA = cmp.earlySide === 'a';
  var early = earlyIsA ? A : B;
  var late = earlyIsA ? B : A;
  var earlyFig = earlyIsA ? figA : figB;
  var lateFig = earlyIsA ? figB : figA;
  var earlyName = String((earlyFig && earlyFig.name) || '');
  var lateName = String((lateFig && lateFig.name) || '');

  var segs = [
    {
      key: 'pre',
      title: '只有' + earlyName,
      start: early.birth.value,
      end: late.birth.value,
      ages: earlyName + ' ' + (late.birth.value - early.birth.value) + ' 岁 · ' + lateName + ' 尚未出生'
    },
    {
      key: 'mid',
      title: '同在一世',
      start: late.birth.value,
      end: Math.min(A.death.value, B.death.value),
      ages: earlyName + ' ' + (late.birth.value - early.birth.value) + ' 岁 · ' + lateName + ' 0 岁'
    },
    {
      key: 'post',
      title: '只剩' + lateName,
      start: Math.min(A.death.value, B.death.value),
      end: Math.max(A.death.value, B.death.value),
      ages: lateName + ' ' + (Math.min(A.death.value, B.death.value) - late.birth.value) + ' 岁送走 ' + earlyName
    }
  ];

  var total = segs[2].end - segs[0].start;
  return segs.map(function (seg) {
    var years = Math.max(0, seg.end - seg.start);
    var evs = [];
    if (years > 0) {
      // 前段只有早出生者的事件；后段只有晚走者的事件；中段两人都取
      if (seg.key === 'pre') evs = eventsInRange(earlyFig, seg.start, seg.end, 2);
      else if (seg.key === 'post') evs = eventsInRange(lateFig, seg.start, seg.end, 2);
      // 中段 = 并存区间，直接复用合并去重后的结果，避免两人各记一遍同一件事
      else evs = collectOverlapEvents(figA, figB, cmp, 2);
    }
    return {
      key: seg.key,
      title: seg.title,
      years: years,
      rangeText: yearLabel(seg.start) + '—' + yearLabel(seg.end),
      ratio: total > 0 ? Math.max(6, Math.round(years / total * 100)) : 0,
      maxRatio: 100,
      ages: seg.ages,
      events: evs,
      emptyText: years > 0 ? '这一段暂未收录可考事件' : ''
    };
  });
}

/** 取某人 events 里落在 [start, end) 的前 N 条（含标题与描述，供 B 视图卡片） */
function eventsInRange(fig, start, end, limit) {
  var out = [];
  var events = (fig && fig.events) || [];
  for (var i = 0; i < events.length; i++) {
    var ev = events[i];
    if (!ev || typeof ev !== 'object') continue;
    var y = parseYear(ev.year);
    if (!y || y.value < start || y.value >= end) continue;
    out.push({ year: y.value, yearLabel: yearLabel(y.value), title: String(ev.title || ''), desc: String(ev.description || '') });
    if (limit && out.length >= limit) break;
  }
  return out;
}

/* ===================== 六、入口资格 ===================== */

/**
 * 中心人物是否放开「双人同看」入口。
 * 两条同时满足才放开：
 *   ① 生卒双全（否则进去就是空白/半截线，入口无意义）；
 *   ② 未被服务端标记为非精选（featured === 0 / false 时不放开）。
 * [注意] 本地缓存的人物没有 featured 字段（缓存池本身就是精选池），
 *   此时按「未标记为非精选」处理，只靠生卒条件判断。
 */
function canOpenDual(figure) {
  if (!figure) return false;
  if (figure.featured === 0 || figure.featured === false || figure.featured === '0') return false;
  var life = lifeOf(figure);
  return life.hasBoth;
}

/* ===================== 七、候选池排序 ===================== */

/**
 * 在候选池里为基准人物挑「可同看」的人，并排序。
 * - 生卒双全者：按并存年数降序，其次按生年接近度；
 * - 只有一端者：单独成组，排在后面（只能看开口线，不能算并存）；
 * - 双缺者：不出现。
 * 同朝代优先分组在前。
 * @param {object} center 基准人物
 * @param {Array} pool 候选人物数组
 * @param {number} [limit] 每组最多返回条数
 * @returns {{ sameDynasty: Array, others: Array, partial: Array }}
 */
function rankCandidates(center, pool, limit) {
  var cap = limit || 12;
  var centerLife = lifeOf(center);
  if (!centerLife.hasBoth) return { sameDynasty: [], others: [], partial: [] };
  var centerDynasty = String(center.dynasty || '');
  var centerId = String(center.id);

  var fullSame = [];
  var fullOther = [];
  var partial = [];

  (pool || []).forEach(function (p) {
    if (!p || String(p.id) === centerId) return;
    var life = lifeOf(p);
    if (life.hasBoth) {
      var cmp = compareLife(center, p);
      var item = {
        id: String(p.id),
        name: String(p.name || ''),
        initial: String(p.name || '·').charAt(0),
        dynasty: String(p.dynasty || ''),
        yearsText: life.yearsText,
        overlap: cmp.overlap,
        // 列表里直接给完整文案：有并存写年数，没有就如实写「未曾同世」
        overlapText: cmp.hasOverlap
          ? '同活 ' + (cmp.approx ? '约 ' : '') + cmp.overlap + ' 年'
          : '未曾同世',
        diffText: cmp.diff === null ? '' : '相差 ' + (cmp.approx ? '约 ' : '') + cmp.diff + ' 岁',
        diff: cmp.diff,
        earlySide: cmp.earlySide,
        approx: cmp.approx,
        life: life
      };
      if (centerDynasty && item.dynasty === centerDynasty) fullSame.push(item);
      else fullOther.push(item);
    } else if (life.birth || life.death) {
      partial.push({
        id: String(p.id),
        name: String(p.name || ''),
        initial: String(p.name || '·').charAt(0),
        dynasty: String(p.dynasty || ''),
        yearsText: life.yearsText,
        stateLabel: life.stateLabel,
        life: life
      });
    }
  });

  function byOverlap(x, y) {
    if ((y.overlap || 0) !== (x.overlap || 0)) return (y.overlap || 0) - (x.overlap || 0);
    return (x.diff === null ? 9999 : x.diff) - (y.diff === null ? 9999 : y.diff);
  }
  fullSame.sort(byOverlap);
  fullOther.sort(byOverlap);
  partial.sort(function (x, y) { return String(x.name).localeCompare(String(y.name)); });

  return {
    sameDynasty: fullSame.slice(0, cap),
    others: fullOther.slice(0, cap),
    partial: partial.slice(0, 6)
  };
}

/* ===================== 八、条件文案 ===================== */

/** 概览一句话：同年差 / 同活年数 / 晚走年数，缺哪项就不写哪项，不补 0 */
function summaryText(cmp, nameA, nameB) {
  if (!cmp || cmp.status !== 'full') {
    return '生卒年份不全，只能看单线，并存区间待补。';
  }
  var early = cmp.earlySide === 'a' ? nameA : nameB;
  var late = cmp.earlySide === 'a' ? nameB : nameA;
  if (!cmp.hasOverlap) {
    return early + ' 比 ' + late + ' 早 ' + (cmp.approx ? '约 ' : '') + cmp.diff + ' 年，两人没有重叠的岁月。';
  }
  var surv = cmp.survivorSide === 'a' ? nameA : nameB;
  return early + ' 比 ' + late + ' 早 ' + (cmp.approx ? '约 ' : '') + cmp.diff + ' 年，同活 ' +
    (cmp.approx ? '约 ' : '') + cmp.overlap + ' 年；' + surv + ' 晚走 ' +
    (cmp.approx ? '约 ' : '') + cmp.survivorYears + ' 年。';
}

module.exports = {
  parseYear: parseYear,
  yearLabel: yearLabel,
  lifeOf: lifeOf,
  compareLife: compareLife,
  buildPlotModel: buildPlotModel,
  collectOverlapEvents: collectOverlapEvents,
  buildActs: buildActs,
  canOpenDual: canOpenDual,
  rankCandidates: rankCandidates,
  summaryText: summaryText,
  pct: pct
};
