/** @module Vector3 */

/**
 * 3d vector class
 */
export default class Vector3 {
  /**
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  constructor(x=0, y=0, z=0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * @return {Vector3} A copy of this vector
   */
  copy() {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * Adds the given vector to this one
   * @param {Vector3} vector
   * @return {Vector3} This vector, for chaining
   */
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    return this;
  }

  /**
   * Subtracts the given vector from this one
   * @param {Vector3} vector
   * @return {Vector3} This vector, for chaining
   */
  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
    return this;
  }

  /**
   * Scales this vector by the given amount
   * @param {Number} scalar
   * @return {Vector3} This vector, for chaining
   */
  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  /**
   * @return {Number} The magnitude of this vector, squared (This is more efficient than 'mag', and
   * just as valid for comparing vector lengths)
   */
  get magSquared() {
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
  }

  /**
   * @return {Number} The magnitude of this vector. (For comparing vector lenghts, consider using
   * magSquared instead)
   */
  get mag() {
    return Math.sqrt(this.magSquared);
  }

  /**
   * Sets the magnitude of this vector to the given value
   * @param {Number} value
   */
  set mag(value) {
    this.mult(value / this.mag);
  }

  /** Normalize this vector (set its length to 1) */
  normalize() {
    this.mag = 1;
  }

  /**
   * Constains this vector's lenght between the given values
   * @param {Number} minLength
   * @param {Number} maxLength
   * @return {Vector3} This vector, for chaining
   */
  constrain(minLength, maxLength) {
    const mag = this.mag;
    if (mag < minLength) this.mult(minLength / mag);
    else if (mag > maxLength) this.mult(maxLength / mag);
    return this;
  }
}

/**
 * @param {Vector3} v1
 * @param {Vector3} v2
 * @return {Number} The squared distance between the teo points represented by the two vectors
 */
Vector3.distSq = function(v1, v2) {
  return (v1.x - v2.x)**2 + (v1.y - v2.y)**2 + (v1.z - v2.z)**2;
};

/**
 * @param {Vector3} v1
 * @param {Vector3} v2
 * @return {Number} The distance between the teo points represented by the two vectors
 */
Vector3.dist = function(v1, v2) {
  return Math.sqrt(Vector3.distSq(v1, v2));
};

/**
 * @param {Vector3} v1
 * @param {Vector3} v2
 * @return {Number} The dot product between the two vectors
 */
Vector3.dot = function(v1, v2) {
  return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
};

/**
 * @param {Vector3} v1
 * @param {Vector3} v2
 * @return {Vector3} The cross product of the two vectors
 */
Vector3.cross = function(v1, v2) {
  return new Vector3(
      (v1.y*v2.z)-(v1.z*v2.y),
      (v1.z*v2.x)-(v1.x*v2.z),
      (v1.x*v2.y)-(v1.y*v2.x));
};
