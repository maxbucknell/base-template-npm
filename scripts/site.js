// Use the sqs-core module to access core Squarespace
// functionality, like Lifecycle and ImageLoader. For
// full documentation, go to:
//
// http://github.com/squarespace/squarespace-core

var core = require('@squarespace/core');
var Mercury = require('@squarespace/mercury');
var katex = require('katex');

window.addEventListener('DOMContentLoaded', function() {
  renderImages();
  renderMaths();

  var instance = new Mercury({
    updateMatrix: [
      { selector: 'title', updateHTML: true },
      { selector: 'body', updateAttrs: true },
      { selector: '.container', updateHTML: true },
      { selector: 'script[data-name="static-context"]', updateScript: true }
    ]
  });
});

function renderImages () {
  var images = document.querySelectorAll('img[data-src]');

  images.forEach(renderImage);
}

function renderImage (image) {
  core.ImageLoader.load(image, { load: true });
}

function renderMaths () {
  var display = document.querySelectorAll('code.math');
  var inline = document.querySelectorAll('span.math');

  inline.forEach(renderMath.bind(null, false));
  display.forEach(renderMath.bind(null, true));
  display.forEach(leadify);
}

function renderMath (isDisplayMode, el) {
  var mathText = el.innerText;

  try {
    katex.render(mathText, el, { displayMode: isDisplayMode });
  } catch (e) {
    console.error(e);
    el.innerHTML = mathText;
  }
}

function leadify (el) {
  var height = el.clientHeight;
  var lineHeight = parseInt(core.Tweak.getValue('lead'), 10);
  var difference = lineHeight - (height % lineHeight);

  var lowerMargin = Math.floor(difference / 2);
  var upperMargin = Math.ceil(difference / 2);

  el.style.marginBottom = lowerMargin + 'px';
  el.style.marginTop = upperMargin + 'px';
}
