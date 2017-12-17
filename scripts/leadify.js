/**
 * Used to get configurable values from Squarespace theme.
 */
import { Tweak } from '@squarespace/core';

/**
 * Ensure that an element maintains vertical rhythm.
 */
function leadify (el) {
  const height = el.clientHeight;
  const lineHeight = parseInt(Tweak.getValue('lead'), 10);
  const difference = lineHeight - (height % lineHeight);

  const lowerMargin = Math.floor(difference / 2);
  const upperMargin = Math.ceil(difference / 2);

  el.style.marginBottom = `${lowerMargin}px`;
  el.style.marginTop = `${upperMargin}px`;
}

export default leadify;
