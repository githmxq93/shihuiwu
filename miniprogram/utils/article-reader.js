/**
 * 文章阅读模型（唯一来源）
 *
 * 背景：首页进文章走独立页 pages/article，专题页进文章走浮层
 * components/articleOverlay，两条入口曾各写一套解析与排版，字号/行高/段距/色值
 * 逐渐分叉。2026-11-14 统一为：
 *   utils/article-reader.js（本文件，数据）
 *   templates/article-reader/article-reader.wxml（结构）
 *   templates/article-reader/article-reader.wxss（样式）
 * 浮层与整页同时引用这三份，只保留各自的壳（抓手 / 导航栏）。
 *
 * 约定：
 *   - 正文只有 content 才算「有正文」，只有 summary 时整块当摘要，不打「· 完 ·」
 *   - 文中人物 / 参考文献 / 关键词字段缺失时返回空数组，渲染层整块不显示
 *   - 不做任何示例数据兜底
 */
const { parseArticleContent, readingMinutes } = require('./article-format');

function toArray(v) {
  if (typeof v === 'string') {
    try {
      const p = JSON.parse(v);
      return Array.isArray(p) ? p : [];
    } catch (e) {
      return [];
    }
  }
  return Array.isArray(v) ? v : [];
}

// 字符数加千分位：2340 → 2,340
function fmtCount(n) {
  return String(n || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 解析产物 → 渲染模型
 * 表格单元格在 parseArticleContent 里已被包成 {k,v}，这里统一拍平成字符串，
 * 让浮层与整页共用同一个模板分支。
 * 首字下沉的 dropChar 必须保留：parseArticleContent 会把首段第一个字从 runs
 * 里摘走，模板若不补回来，两条入口都会从第二个字开始显示。
 */
function normalizeBlocks(list) {
  const out = [];
  (list || []).forEach((b, i) => {
    const k = b.k || ('b' + i);
    if (b.t === 'h2') {
      if (b.text) out.push({ k: k, t: 'h2', text: b.text });
      return;
    }
    if (b.t === 'p' || b.t === 'quote') {
      const runs = (b.runs || [])
        .filter((r) => r && r.text)
        .map((r, j) => ({
          k: r.k || (k + 'r' + j),
          text: r.text,
          bold: !!r.bold,
          italic: !!r.italic,
          fig: r.fig || ''
        }));
      if (!runs.length && !b.dropChar) return;
      out.push({
        k: k,
        t: b.t,
        dropChar: b.dropChar || '',
        dropFig: b.dropFig || '',
        runs: runs
      });
      return;
    }
    if (b.t === 'table') {
      // 单元格保留 {k,v}：wx:key 用 k，避免同文单元格重复导致整表重绘
      out.push({
        k: k,
        t: 'table',
        head: (b.head || []).map((c, j) => (c && c.v !== undefined ? c : { k: k + 'h' + j, v: c })),
        rows: (b.rows || []).map((row, ri) => ({
          k: k + 'r' + ri,
          cells: (row || []).map((c, ci) => (c && c.v !== undefined ? c : {
            k: k + 'r' + ri + 'c' + ci,
            v: c
          }))
        }))
      });
      return;
    }
    if (b.t === 'hr') out.push({ k: k, t: 'hr' });
  });
  return out;
}

// 正文 → 块。figureNames 传入时正文里的人名会变成可点 run（仅整页使用）
function buildBlocks(raw, title, figureNames) {
  if (!raw) return [];
  return normalizeBlocks(parseArticleContent(raw, title || '', figureNames));
}

// 文中人物：接口可能给字符串数组或对象数组，只保留有姓名的
function normalizeFigures(v) {
  return toArray(v)
    .map((x, i) => {
      const name = typeof x === 'string' ? x : ((x && x.name) || '');
      return {
        k: 'f' + i,
        name: name,
        initial: name.charAt(0),
        relation: (x && x.relation) || '',
        meta: ''
      };
    })
    .filter((f) => f.name);
}

// 参考文献：第二行按文章页老版口径合并「作者 · 年份 · 出版社」
function normalizeCitations(v) {
  return toArray(v)
    .map((c, i) => {
      const name = (c && (c.name || c.source)) || '';
      return {
        k: 'c' + i,
        name: name,
        meta: [
          (c && c.author) || '',
          (c && c.year) || '',
          c && c.name ? (c.source || '') : ''
        ].filter(Boolean).join(' · '),
        url: (c && c.url) || ''
      };
    })
    .filter((c) => c.name);
}

// 关键词：逗号/顿号分隔；服务端名「世慧屋」不算关键词
function normalizeKeywords(v) {
  return String(v || '')
    .split(/[,，、]/)
    .map((s) => s.trim())
    .filter((s) => s && s !== '世慧屋')
    .map((s, i) => ({ k: 'kw' + i, text: s }));
}

/**
 * 文章对象 → 阅读区完整数据
 * 返回字段与 templates/article-reader 的 data 一一对应。
 */
function buildReaderModel(article) {
  const a = article || {};
  const raw = String(a.content || '').trim();
  const summary = String(a.summary || '').trim();
  const hasBody = !!raw;

  return {
    title: a.title || '',
    era: String(a.era || '').trim(),
    // 字数只统计真实正文；摘要不算，避免把 70 字摘要说成「全文 70 字」
    wordCount: hasBody ? fmtCount(raw.replace(/\s/g, '').length) : '',
    readMin: hasBody ? readingMinutes(raw) : 0,
    blocks: hasBody ? buildBlocks(raw, a.title) : [],
    hasBody: hasBody,
    // 没有正文时把摘要原样展示（不缩进、不打「· 完 ·」）
    fullText: hasBody ? '' : summary,
    isExcerpt: !hasBody && !!summary,
    figures: normalizeFigures(a.relatedFigures),
    citations: normalizeCitations(a.citations),
    keywords: normalizeKeywords(a.keywords)
  };
}

module.exports = {
  buildReaderModel,
  buildBlocks,
  normalizeFigures,
  normalizeCitations,
  normalizeKeywords,
  fmtCount
};
