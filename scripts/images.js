/**
 * Squarespace image loader.
 */
import { ImageLoader } from '@squarespace/core';

/**
 * Ensure images maintain correct vertical rhythm.
 */
import leadify from './leadify';

/**
 * Event listener for when image loads.
 *
 * Maintain vertical rhythm.
 */
function loadListener ({ target }) {
  leadify(target);
  target.removeEventListener(loadListener);
}

/**
 * Initialize the Squarespace ImageLoader on an image.
 */
function renderImage (image) {
  ImageLoader.load(image, { load: true });

  image.addEventListener('load', loadListener);
}

/**
 * Find all lazy load images, and render them
 */
function renderImages () {
  var images = document.querySelectorAll('img[data-src]');

  images.forEach(renderImage);
}

export default renderImages;
