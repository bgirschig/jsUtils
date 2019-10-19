/** @module dom */

/**
 * Create an html element in one step
 * @param {string} tagName - Name of the element to create (eg. 'div', 'a', ...)
 * @param {string} content - Text content for the element
 * @param {object} attributes - An object representing attibutes for the element (attributeName:
 * attributeValue)
 * @return {HTMLElement}
 */
export function createElement(tagName = 'div', content = null, attributes = {}) {
  const el = document.createElement(tagName);
  if (content) el.innerText = content;
  Object.keys(attributes).forEach((key) => el.setAttribute(key, attributes[key]));
  return el;
}

/**
 * Copies the given text to the clipboard
 * @param {string} text
 */
export function copyToClipboard(text) {
  const el = document.createElement('textarea');
  // Move element out of screen
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  el.value = text;
  document.body.appendChild(el);

  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

/**
 * Returns the contents of a meta tag
 * @example
 * getMeta('viewport') // 'width=device-width, initial-scale=1.0'
 * @param {String} name
 * @param {String} keyName (default: property)
 * @return {string}
 */
export function getMeta(name, keyName = 'property') {
  return document.head.querySelector(`[${keyName}~="${name}"][content]`).content;
}

/** Opens a popup window
 * @param {Number} width
 * @param {Number} height
 * @param {String} url
 * @param {String} title
 */
export function popup(width, height, url, title) {
  const popupX = (window.innerWidth / 2 - width / 2);
  const popupY = (window.innerHeight / 2 - height / 2);
  window.open(url, title, `height=${height}, width=${width},
    top=${popupX}, left=${popupY}, toolbar=0, location=0, menubar=0,
    directories=0, scrollbars=0`);
}
