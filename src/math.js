/** @module math */

/**
 * Gaussian function (ie. bell curve)
 * @param {Number} val What point of the curve to return
 * @param {Number} w width of the bell
 * @param {Number} h height of the bell
 * @param {Number} offset offset (along the x axis) of the bell
 * @return {Number}
 */
export function gauss(val, w, h, offset) {
  return h/(Math.pow(2, Util.Math.sq((val-offset)/w)));
}

/**
 * Returns val, constrained between min and max
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function constrain(val, min, max) {
  if (min > max) {
    throw new Error('constrain\'s minimum must be lower than its maximum');
  }
  if (typeof val !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('All of constrain() parameters must be numbers');
  }
  if (val > max) return max;
  else if (val < min) return min;
  return val;
}

/**
 * Perform Hermite interpolation between two values (implements hlsl's smoothstep). For details:
 * https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/smoothstep.xhtml
 * @param {Number} edge0
 * @param {Number} edge1
 * @param {Number} x
 * @return {Number}
 */
export function smoothStep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

/**
 * Maps a value from one number space to another
 * @param {Number} val
 * @param {Number} inMin (default: 0)
 * @param {Number} inMax (default: 1)
 * @param {Number} outMin (default: 0)
 * @param {Number} outMax (default: 1)
 * @return {Number}
 */
export function map(val, inMin = 0, inMax = 1, outMin = 0, outMax = 1) {
  return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
