/**
 * Math renderer
 */
import katex from 'katex';

/**
 * Ensure math elements maintain vertical rhythm post render.
 */
import leadify from './leadify';

/**
 * Render a single math element, either inline or block level.
 */
function renderMath (isDisplayMode, el) {
  var mathText = el.innerText;

  try {
    katex.render(mathText, el, { displayMode: isDisplayMode });
  } catch (e) {
    console.error(e);
    el.innerHTML = mathText;
  }
}

/**
 * Find all math elements, and render them using KaTeX.
 */
function renderMaths () {
  var display = document.querySelectorAll('code.math');
  var inline = document.querySelectorAll('span.math');

  inline.forEach(renderMath.bind(null, false));
  display.forEach(renderMath.bind(null, true));
  display.forEach(leadify);
}

export default renderMaths;
