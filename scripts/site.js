// Use the sqs-core module to access core Squarespace
// functionality, like Lifecycle and ImageLoader. For
// full documentation, go to:
//
// http://github.com/squarespace/squarespace-core

import Mercury from '@squarespace/Mercury';

import renderImages from './images';
import renderMaths from './math';

function initializeMercury (_config) {
  const config = Object.assign(
    {},
    {
      updateMatrix: [
        { selector: 'title', updateHTML: true },
        { selector: 'body', updateAttrs: true },
        { selector: '.container', updateHTML: true },
        { selector: 'script[data-name="static-context"]', updateScript: true }
      ]
    },
    _config
  );

  const instance = new Mercury(config);

  return instance;
}

function initializePage () {
  renderMaths();
  renderImages();
}

window.addEventListener('DOMContentLoaded', function() {
  initializeMercury({ onLoad: initializePage });
  initializePage();
});
