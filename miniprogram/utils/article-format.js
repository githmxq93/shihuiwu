/**
 * 文章正文解析：把服务端存的混合标记（Markdown + 少量 HTML）解析成结构化块，
 * 供文章详情页按杂志式排版渲染。
 *
 * 真实数据形态（2026-09-16 对线上 100 篇统计）：
 *   <p> ×486、<strong> ×96、<span> ×50、<blockquote> ×14、<em> ×8、<br> ×7、<div> ×2、<footer> ×2
 *   独立成行的 **粗体** 共 85 处（= 小节标题，最需要还原）
 *   > 引用 12 处；| 表格 | 一个（比赛/事件清单）
 * 支持的块类型：h2 / p / quote / table / hr / footer
 * 行内支持：**粗体**、*斜体* / _斜体_
 */

// 把 HTML 片段归一到 Markdown 记号
function normalizeHtml(raw) {
  let s = String(raw || '');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/(p|div|footer|blockquote|h[1-6])>/gi, '\n');
  s = s.replace(/<(p|div|footer)[^>]*>/gi, '\n');
  s = s.replace(/<blockquote[^>]*>/gi, '\n> ');
  s = s.replace(/<\/blockquote>/gi, '\n');
  s = s.replace(/<(strong|b)[^>]*>/gi, '**').replace(/<\/(strong|b)>/gi, '**');
  s = s.replace(/<(em|i)[^>]*>/gi, '_').replace(/<\/(em|i)>/gi, '_');
  s = s.replace(/<span[^>]*>/gi, '').replace(/<\/span>/gi, '');
  // 其余未识别标签一律剥掉，避免把标签当正文显示
  s = s.replace(/<[^>]+>/g, '');
  // HTML 实体
  s = s.replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#39;/g, "'");
  return s;
}

// 行内 → runs（粗体/斜体分段），并把连续空白压成一个空格
function parseRuns(text) {
  const runs = [];
  const re = /\*\*([^*]+)\*\*|_([^_]+)_/g;
  let last = 0, m;
  const push = (t, bold, italic) => {
    const clean = t.replace(/\s+/g, ' ');
    if (clean) runs.push({ text: clean, bold: !!bold, italic: !!italic });
  };
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index), false, false);
    if (m[1] !== undefined) push(m[1], true, false);
    else push(m[2], false, true);
    last = re.lastIndex;
  }
  push(text.slice(last), false, false);
  return runs;
}

// 是否是「小节标题」行：独立成行的 **加粗** / # 标题 / 一、二、 或 1. 开头的短句
function isHeading(line) {
  const t = line.trim();
  if (/^#{1,6}\s+\S/.test(t)) return true;
  if (/^\*\*[^*]+\*\*$/.test(t)) return true;
  if (/^[一二三四五六七八九十百]+[、.．]\s*\S/.test(t) && t.length <= 32 && !/[。！？；]$/.test(t)) return true;
  if (/^\d{1,2}[、.．]\s*\S/.test(t) && t.length <= 32 && !/[。！？；]$/.test(t)) return true;
  return false;
}

function headingText(line) {
  let t = line.trim();
  t = t.replace(/^#{1,6}\s+/, '');
  t = t.replace(/^\*\*(.+)\*\*$/, '$1');
  return t.trim();
}

function splitRow(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
}
function isTableSep(line) {
  return /^\|?[\s:\-|]+\|?$/.test(line.trim()) && line.indexOf('-') !== -1;
}

function parseArticleContent(raw, title, figureNames) {
  const text = normalizeHtml(raw);
  const lines = text.split(/\r?\n/);
  const blocks = [];
  let para = [];

  const flushPara = () => {
    const joined = para.join('').trim();
    para = [];
    if (!joined) return;
    const runs = parseRuns(joined);
    if (runs.length) blocks.push({ t: 'p', runs });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();

    if (!t) { flushPara(); continue; }

    // 分隔线
    if (/^[-*_]{3,}$/.test(t)) { flushPara(); blocks.push({ t: 'hr' }); continue; }

    // 表格
    if (t.charAt(0) === '|') {
      flushPara();
      const rows = [];
      let j = i;
      while (j < lines.length && lines[j].trim().charAt(0) === '|') {
        const ln = lines[j].trim();
        if (!isTableSep(ln)) rows.push(splitRow(ln));
        j++;
      }
      i = j - 1;
      if (rows.length) {
        blocks.push({
          t: 'table',
          head: rows[0].map(c => c.replace(/\*\*/g, '')),
          rows: rows.slice(1).map(r => r.map(c => c.replace(/\*\*/g, '')))
        });
      }
      continue;
    }

    // 引用（连续多行合并）
    if (/^>\s?/.test(t)) {
      flushPara();
      const buf = [];
      let j = i;
      while (j < lines.length && /^>\s?/.test(lines[j].trim())) {
        buf.push(lines[j].trim().replace(/^>\s?/, ''));
        j++;
      }
      i = j - 1;
      blocks.push({ t: 'quote', runs: parseRuns(buf.join('')) });
      continue;
    }

    // 小节标题
    if (isHeading(line)) {
      flushPara();
      blocks.push({ t: 'h2', text: headingText(line) });
      continue;
    }

    // 普通段落行（无空行分隔时按句拼接）
    para.push(t);
  }
  flushPara();

  // 首段标记（用于首字下沉）
  // [注意] WXSS 不支持 ::first-letter，必须把首字单独拆出来交给模板渲染，
  //    因此这里顺带把首段 runs 的第一个字符摘掉，避免重复显示。
  //
  // [注意] 人名切分必须在下沉摘字**之前**：下沉会把段首第一个字移进 dropChar，
  //    若人名正好从段首开始（「严武，字子容…」），先摘字就永远匹配不上，
  //    读者会看到「严」大号、「武」却不可点。
  if (figureNames && figureNames.length) linkifyFigureNames(blocks, figureNames);
  markLead(blocks);

  // 数据里有些文章正文开头又写了一遍标题（独立成行的 **标题**），
  // 页面顶部已有大标题，这里去掉重复块，避免一上来看见两遍标题
  if (title) {
    const norm = (s) => String(s || '').replace(/[\s*#、.．:：]/g, '');
    const t = norm(title);
    while (blocks.length) {
      const b = blocks[0];
      if (b.t === 'h2' && (norm(b.text) === t || (t.length > 6 && norm(b.text).indexOf(t) === 0))) blocks.shift();
      else break;
    }
    markLead(blocks);
  }
  return finalizeKeys(blocks);
}

// 给第一段打 lead 标，并拆出首字
function markLead(blocks) {
  for (let k = 0; k < blocks.length; k++) {
    const b = blocks[k];
    if (b.t === 'p') {
      const runs = b.runs || [];
      if (!runs.length || b.dropChar) { b.lead = true; return; }
      const first = runs[0];
      const txt = String(first.text || '');
      const m = txt.match(/^\s*(\S)/);
      // 首字必须是汉字/字母/数字才做下沉。正文里有 6 篇是「《」「"」开头，
      // 92rpx 的标点只有半个字形：float 后左半边悬空、右侧又撑出一个洞。
      if (!m || !/[\u4e00-\u9fa5A-Za-z0-9]/.test(m[1])) return;
      b.lead = true;
      b.dropChar = m[1];
      // 段首就是人名首字时，大写的那个字也要能点，否则「严」大号红字、「武」绿字很怪
      if (first.fig) b.dropFig = first.fig;
      const rest = txt.replace(/^\s*\S/, '').replace(/^\s+/, '');
      if (rest) runs[0] = { text: rest, bold: first.bold, italic: first.italic, fig: first.fig || '' };
      else runs.shift();
      return;
    }
    if (b.t !== 'h2') return;
  }
}

/**
 * 正文人名 → 可点 run（2026-10-21）
 *
 * 数据背景：110 篇里 relatedFigures 共 91 条，其中 76 条（84%）姓名在正文中字面出现，
 * 所以不需要分词，直接按名字做最长优先切分即可。
 *
 * 规则：
 *   - 只处理 p / quote（小节标题挂着可点会破坏竖条排版）
 *   - 每段只标**首次**出现：同一段里重复提同一个人全变红会让版面显脏；
 *     但跨段要重新标，否则读者第二次看到时点不动，会当成 bug
 *   - 名字按长度降序试，同位置取最长，避免「李治」咬掉「李治平」
 */
function linkifyFigureNames(blocks, names) {
  const list = (names || []).filter((n) => typeof n === 'string' && n.length >= 2);
  if (!list.length) return finalizeKeys(blocks);
  const sorted = list.slice().sort((a, b) => b.length - a.length);

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.t !== 'p' && b.t !== 'quote') continue;
    const hit = {};
    const runs = b.runs || [];
    const out = [];
    for (let j = 0; j < runs.length; j++) {
      const r = runs[j];
      if (r.fig || !r.text) { out.push(r); continue; }
      const done = {};
      const pieces = [];
      let rest = String(r.text);
      while (rest) {
        const p = pickEarliest(rest, sorted, hit, done);
        if (!p) break;
        if (p.at > 0) pieces.push({ text: rest.slice(0, p.at), bold: r.bold, italic: r.italic });
        pieces.push({ text: p.nm, bold: r.bold, italic: r.italic, fig: p.nm });
        done[p.nm] = 1;
        rest = rest.slice(p.at + p.nm.length);
      }
      if (!pieces.length) { out.push(r); continue; }
      if (rest) pieces.push({ text: rest, bold: r.bold, italic: r.italic });
      for (let q = 0; q < pieces.length; q++) {
        if (pieces[q].fig && !hit[pieces[q].fig]) hit[pieces[q].fig] = 1;
        out.push(pieces[q]);
      }
    }
    b.runs = out;
  }
  return finalizeKeys(blocks);
}

// 在 rest 中找「最靠前、同位置最长」且本段内尚未用过的名字
function pickEarliest(rest, sorted, hit, done) {
  let best = null;
  for (let i = 0; i < sorted.length; i++) {
    const nm = sorted[i];
    if (hit[nm] || done[nm]) continue;
    const at = rest.indexOf(nm);
    if (at === -1) continue;
    if (!best || at < best.at || (at === best.at && nm.length > best.nm.length)) {
      best = { at: at, nm: nm };
    }
  }
  return best;
}

/**
 * 为 wx:for 补稳定键（2026-10-21）
 *
 * 模板里 8 处 wx:key="idx"，但解析产物只有 t/runs/text/bold/italic —— 键值恒为
 * undefined，每次 setData 整段重建，控制台还会刷告警。这里统一编号：
 *   blocks → b0/b1…，runs → b0r0…，表格单元格 → b0h0 / b0r0c0
 * 表格/关键词的元素是裸字符串，无法挂字段，故转成 {k,v} 对象。
 */
function finalizeKeys(blocks) {
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    b.k = 'b' + i;
    if (b.runs) {
      const kept = [];
      for (let j = 0; j < b.runs.length; j++) {
        const r = b.runs[j];
        if (!r || !r.text) continue;
        r.k = b.k + 'r' + kept.length;
        kept.push(r);
      }
      b.runs = kept;
    }
    if (b.t === 'table') {
      // 幂等：linkify 后二次调用时单元格已是 {k,v}，不能再包一层
      const isCell = (c) => !!c && typeof c === 'object' && c.k !== undefined;
      if (!(b.head || []).every(isCell)) {
        b.head = (b.head || []).map((v, j) => ({ k: b.k + 'h' + j, v: v }));
      }
      if (!(b.rows || []).every((row) => (row || []).every(isCell))) {
        b.rows = (b.rows || []).map((row, ri) => (row || []).map((v, ci) => ({
          k: b.k + 'r' + ri + 'c' + ci,
          v: v
        })));
      }
    }
  }
  return blocks;
}

// 阅读时长（中文按 400 字/分钟粗估）
function readingMinutes(raw) {
  const n = String(raw || '').replace(/\s/g, '').length;
  return Math.max(1, Math.round(n / 400));
}

module.exports = {
  parseArticleContent,
  readingMinutes,
  normalizeHtml,
  linkifyFigureNames,
  finalizeKeys
};
