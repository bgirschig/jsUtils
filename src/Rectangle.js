/** @module rectangle */

/** A geometric rectangle */
export default class Rectangle {
  /**
   * @param {Number} x - top left corner
   * @param {Number} y - top rigth corner
   * @param {Number} w - width
   * @param {Number} h - width
   */
  constructor(x = 0, y = 0, w = 1, h = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  /**
   * Constructs a rectangle from a dom element's bounding rect
   * @param {HTMLElement} element
   * @return {Rectangle}
   */
  static fromDom(element) {
    const bounds = element.getBoundingClientRect();
    return new Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);
  }

  /**
   * Constructs a rectangle from an object containing x, y, width and height property
   * @param {Object} rect
   * @param {number} rect.x
   * @param {number} rect.y
   * @param {number} rect.height
   * @param {number} rect.width
   * @return {Rectangle}
   */
  static fromObj(rect) {
    return new Rectangle(rect.x, rect.y, rect.width, rect.height);
  }

  /**
   * Constructs a rectangle from min and max values
   * @param {Number} minX
   * @param {Number} minY
   * @param {Number} maxX
   * @param {Number} maxY
   * @return {Rectangle}
   */
  static fromMinMax(minX, minY, maxX, maxY) {
    return new Rectangle(minX, minY, maxX - minX, maxY - minY);
  }

  /** @return {Number} */
  get width() {
    return this.w;
  }

  /** @param {Number} val*/
  set width(val) {
    this.x = this.x + (this.w - val) / 2;
    this.w = val;
  }

  /** @return {Number} */
  get height() {
    return this.h;
  }

  /** @param {Number} val*/
  set height(val) {
    this.y = this.y + (this.height - val) / 2;
    this.h = val;
  }

  /** @return {Number} */
  get top() {
    return this.y;
  }

  /** @return {Number} */
  get left() {
    return this.x;
  }

  /** @return {Number} */
  get right() {
    return this.x + this.w;
  }

  /** @return {Number} */
  get bottom() {
    return this.y + this.h;
  }

  /** @return {Number} */
  get ratio() {
    return this.w / this.h;
  }

  /** @param {Number} val*/
  set left(val) {
    this.w += this.x - val;
    this.x = val;
  }

  /** @param {Number} val*/
  set top(val) {
    this.h += this.y - val;
    this.y = val;
  }

  /** @param {Number} val*/
  set right(val) {
    this.w = val - this.x;
  }

  /** @param {Number} val*/
  set bottom(val) {
    this.h = val - this.y;
  }

  /**
   * Returns the transform parameters necessary to make this rectangle fit in the given zone
   * @param {Rectangle} zone
   * @return {Object}
   */
  fitParameters(zone) {
    let scale;
    if (zone.ratio > this.ratio) scale = zone.height / this.height;
    else scale = zone.width / this.width;

    return {
      scale,
      offset: {
        x: zone.x + ((zone.width - this.width * scale) / 2) - this.x * scale,
        y: zone.y + ((zone.height - this.height * scale) / 2) - this.y * scale,
      },
    };
  }

  /**
   * Returns true if the given point is inside the rectangle
   * @param {Object} point
   * @return {boolean}
   */
  contains(point) {
    return (
      point[0] >= this.x &&
      point[0] <= this.right &&
      point[1] >= this.y &&
      point[1] <= this.bottom);
  }

  /**
   * Return true if the given 'bounds' intersect with the rectangle
   * @param {Rectangle} bounds
   * @return {boolean}
   */
  intersects(bounds) {
    const isOut =
      bounds.x > this.right ||
      bounds.rigth < this.x ||
      bounds.y > this.bottom ||
      bounds.bottom < this.y;
    return !isOut;
  }
}
