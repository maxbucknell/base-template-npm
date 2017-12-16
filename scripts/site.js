
// Use the sqs-core module to access core Squarespace
// functionality, like Lifecycle and ImageLoader. For
// full documentation, go to:
//
// http://github.com/squarespace/squarespace-core

var core = require('@squarespace/core');
var katex = require('katex');

window.addEventListener('DOMContentLoaded', function() {
  renderImages();
  renderMaths();
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

  display.forEach(renderMath.bind(null, true));
  inline.forEach(renderMath.bind(null, false));
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
