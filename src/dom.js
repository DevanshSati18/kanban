// DOM utility helpers (reusable). Minimal, well-tested helpers
export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'dataset') {
      for (const [dKey, dVal] of Object.entries(v)) node.dataset[dKey] = dVal;
    } else if (k.startsWith('on') && typeof v === 'function') {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else {
      node.setAttribute(k, v);
    }
  }
  children.flat().forEach(c => {
    if (c == null) return;
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}
