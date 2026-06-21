import { defineElement, shadow } from './core.js'

export class CompactMarkdown extends HTMLElement {
  static get observedAttributes() {
    return ['content', 'streaming']
  }

  constructor() {
    super()
    this.root = shadow(this, `
      :host {
        display: block;
      }
      .markdown-body {
        font-family: inherit;
        line-height: 1.4;
        overflow-wrap: anywhere;
        color: var(--cc-text);
      }
      .markdown-body > :first-child { margin-top: 0; }
      .markdown-body > :last-child { margin-bottom: 0; }
      
      .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 {
        margin-top: 1em;
        margin-bottom: 0.25em;
        font-weight: 600;
        line-height: 1.25;
      }
      .markdown-body h1 { font-size: 1.4em; }
      .markdown-body h2 { font-size: 1.2em; border-bottom: 1px solid var(--cc-border); padding-bottom: .2em; }
      .markdown-body h3 { font-size: 1.1em; }
      .markdown-body p, .markdown-body blockquote, .markdown-body table, .markdown-body pre {
        margin-top: 0;
        margin-bottom: 0.75em;
      }
      .markdown-body ul, .markdown-body ol {
        margin-top: 0;
        margin-bottom: 0.75em;
        padding-left: 1.5em;
      }
      .markdown-body li > p {
        margin-bottom: 0.25em;
      }
      .markdown-body code {
        background: var(--cc-soft-bg);
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        padding: 0.1em 0.3em;
        font-size: 0.9em;
        font-family: monospace;
      }
      .markdown-body pre {
        background: var(--cc-soft-bg);
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        padding: 0.75em;
        overflow-x: auto;
      }
      .markdown-body pre > code {
        background: none;
        border: none;
        padding: 0;
        font-size: 0.9em;
        white-space: pre;
      }
      .markdown-body blockquote {
        margin: 0 0 0.75em 0;
        padding: 0 0.75em;
        border-left: 3px solid var(--cc-border);
        color: var(--cc-muted);
      }
      .markdown-body table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 0.75em;
      }
      .markdown-body th, .markdown-body td {
        border: 1px solid var(--cc-border);
        padding: 4px 8px;
        text-align: left;
      }
      .markdown-body th {
        font-weight: 600;
        background: var(--cc-softer-bg);
      }

      .cursor {
        display: inline-block;
        width: 8px;
        height: 1.2em;
        background: var(--cc-text);
        vertical-align: middle;
        margin-left: 4px;
        animation: blink 1s step-end infinite;
      }
      @keyframes blink { 50% { opacity: 0; } }
    `, '<div class="markdown-body" id="body"></div>')
    
    this._body = this.root.getElementById('body')
    this._content = ''
    this._streaming = false
  }

  get content() { return this._content }
  set content(val) {
    this._content = val || ''
    this.render()
  }

  get streaming() { return this._streaming }
  set streaming(val) {
    const isStreaming = val !== null && val !== 'false' && val !== false;
    if (this._streaming !== isStreaming) {
      this._streaming = isStreaming;
      this.render();
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'content') this.content = newVal
    if (name === 'streaming') this.streaming = newVal
  }

  render() {
    this._body.innerHTML = renderMarkdown(this._content) + (this._streaming ? '<span class="cursor"></span>' : '');
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}

function renderMarkdown(md) {
  if (!md) return ''
  
  // Clean up returns
  md = md.replace(/\r\n/g, '\n')
  
  // Handle streaming unclosed backticks
  const codeBlocksCount = (md.match(/```/g) || []).length;
  if (codeBlocksCount % 2 !== 0) {
    md += '\n```';
  }

  // Extract code blocks to protect them from further processing
  const codeBlocks = [];
  md = md.replace(/^```(\w*)\n([\s\S]*?)(^```|\z)/gm, (match, lang, code) => {
    codeBlocks.push(code)
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Simple Block rules
  const lines = md.split('\n');
  const tokens = [];
  let inList = null; // null, 'ul', 'ol'
  let listIndents = []; // stack of indents for nested lists

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table row detection
    if (line.match(/^\|.*\|$/)) {
      if (!tokens.length || tokens[tokens.length - 1].type !== 'table') {
        tokens.push({ type: 'table', rows: [] });
      }
      // Skip separator
      if (line.match(/^\|[-\s|:]+\|$/)) continue;
      
      const cols = line.split('|').slice(1, -1).map(s => s.trim());
      tokens[tokens.length - 1].rows.push(cols);
      continue;
    }

    // List detection
    const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)/);
    if (listMatch) {
      const isUl = ['-', '*'].includes(listMatch[2]);
      const type = isUl ? 'ul' : 'ol';
      const indent = listMatch[1].length;

      if (!tokens.length || tokens[tokens.length - 1].type !== 'list') {
        tokens.push({ type: 'list', items: [], listType: type });
      }
      tokens[tokens.length - 1].items.push({ text: listMatch[3], indent, type });
      continue;
    }

    // Blockquote
    const bqMatch = line.match(/^>\s*(.*)/);
    if (bqMatch) {
      if (!tokens.length || tokens[tokens.length - 1].type !== 'blockquote') {
        tokens.push({ type: 'blockquote', lines: [] });
      }
      tokens[tokens.length - 1].lines.push(bqMatch[1]);
      continue;
    }

    // Heading
    const hMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (hMatch) {
      tokens.push({ type: 'heading', level: hMatch[1].length, text: hMatch[2] });
      continue;
    }

    // Code block placeholder
    const cbMatch = line.match(/^__CODE_BLOCK_(\d+)__/);
    if (cbMatch) {
      tokens.push({ type: 'codeblock', index: parseInt(cbMatch[1]) });
      continue;
    }

    // Empty blank line
    if (line.trim() === '') {
      tokens.push({ type: 'empty' });
      continue;
    }

    // Paragraph accumulation
    if (!tokens.length || tokens[tokens.length - 1].type !== 'paragraph') {
      tokens.push({ type: 'paragraph', lines: [] });
    }
    tokens[tokens.length - 1].lines.push(line);
  }

  // Parse Inline
  const inline = (text) => {
    // protect inline code
    let ic = [];
    text = text.replace(/`([^`]+)`/g, (m, c) => {
      ic.push(escapeHtml(c));
      return `@@INLINE_CODE_${ic.length - 1}@@`;
    });
    // escape html
    text = escapeHtml(text);

    // Bold
    text = text.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    // Italic
    text = text.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    text = text.replace(/_([^_]+)_/g, '<em>$1</em>');
    // Link
    text = text.replace(/\[([^]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // restore inline code
    text = text.replace(/@@INLINE_CODE_(\d+)@@/g, (m, i) => `<code>${ic[parseInt(i)]}</code>`);
    return text;
  };

  // Render tokens
  let html = '';
  for (const token of tokens) {
    switch (token.type) {
      case 'heading':
        html += `<h${token.level}>${inline(token.text)}</h${token.level}>\n`;
        break;
      case 'paragraph':
        html += `<p>${inline(token.lines.join('\n'))}</p>\n`;
        break;
      case 'blockquote':
        html += `<blockquote>${inline(token.lines.join('\n'))}</blockquote>\n`;
        break;
      case 'codeblock':
        html += `<pre><code>${escapeHtml(codeBlocks[token.index] || '')}</code></pre>\n`;
        break;
      case 'table':
        html += '<table>\n';
        token.rows.forEach((row, rIdx) => {
          html += '  <tr>\n';
          row.forEach(col => {
            const tag = rIdx === 0 ? 'th' : 'td';
            html += `    <${tag}>${inline(col)}</${tag}>\n`;
          });
          html += '  </tr>\n';
        });
        html += '</table>\n';
        break;
      case 'list': {
        let stack = [];
        let h = '';
        token.items.forEach((item) => {
          while (stack.length > 0 && stack[stack.length - 1].indent > item.indent) {
            const top = stack.pop();
            h += `</${top.type}>\n`;
          }
          if (stack.length === 0 || stack[stack.length - 1].indent < item.indent) {
            h += `<${item.type}>\n`;
            stack.push({ indent: item.indent, type: item.type });
          } else if (stack.length > 0 && stack[stack.length - 1].type !== item.type) {
            const top = stack.pop();
            h += `</${top.type}>\n`;
            h += `<${item.type}>\n`;
            stack.push({ indent: item.indent, type: item.type });
          }
          h += `  <li>${inline(item.text)}</li>\n`;
        });
        while (stack.length > 0) {
          const top = stack.pop();
          h += `</${top.type}>\n`;
        }
        html += h;
        break;
      }
    }
  }

  return html;
}

defineElement('compact-markdown', CompactMarkdown)
