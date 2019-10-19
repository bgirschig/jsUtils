/** @module Quadtree */

import {Rectangle} from './Rectangle';

/**
  * Constructs a quadtree for quickly finding points in a given zone: O(log n)
  * Inspired from https://github.com/CodingTrain/QuadTree
  *
  * There are tow modes: *normalMode* and *indexMode*
  * - In normalMode, the methods deal directly with points (an array with 2 values). ie, when using
  * 'getPoints', the method will return the points themselves
  * - In indexMode, the methods deal with point indices: references to points within a dataset
  *
  * To use indexmode, use the 'setData' method. This will provide the data to map indices to, and
  * construct the quadtree from it
*/
export default class QuadTree {
  /**
   * @param {Rectangle} bounds
   * @param {Number} subdivideTreshold - Keep this much points before subdividing
   */
  constructor(bounds = new Rectangle(), subdivideTreshold = 5) {
    this.subdivideTreshold = subdivideTreshold;
    this.bounds = bounds;
    this.divided = false;
    this.points = [];
    this.quadrants = [];
    this.indexMode = false;
    this.flatData = false;
  }

  /** Subdivide the current 'tile' into sub tiles */
  subdivide() {
    const {x, y} = this.bounds;
    const w = this.bounds.w / 2;
    const h = this.bounds.h / 2;

    this.quadrants = [
      new QuadTree(new Rectangle(x, y, w, h), this.subdivideTreshold),
      new QuadTree(new Rectangle(x + w, y, w, h), this.subdivideTreshold),
      new QuadTree(new Rectangle(x, y + h, w, h), this.subdivideTreshold),
      new QuadTree(new Rectangle(x + w, y + h, w, h), this.subdivideTreshold),
    ];
    if (this.indexMode) {
      this.quadrants.forEach((quadrant) => {
        // We don't use the setData method here, to avoid running 'insert' on all
        // points in the dataset for each subdivision
        const quadrantRef = quadrant;
        quadrantRef.indexMode = true;
        quadrantRef.flatData = this.flatData;
        quadrantRef.data = this.data;
      });
    }

    this.divided = true;

    // re-insert the self-points in the appropriate quadrant, after the division
    this.points.forEach((point) => this.insert(point));
    // remove self-points
    this.points = null;
  }

  /**
   * Insert a point into the quadtree or one of its quadrants
   * @param {Point|Number} point - either a point or an index to a point in the
   * data (if indexMode is true)
   */
  insert(point) {
    if (this.indexMode && !Number.isSafeInteger(point)) {
      throw new Error('can\'t insert points while in indexMode');
    }

    const pointData = this.indexMode ? this._point(point) : point;

    if (!this.divided && this.points.length < this.subdivideTreshold) {
      if (!this.bounds.contains(pointData)) {
        throw new Error('the point doesn\'t fit in any quadrant');
      }
      this.points.push(point);
    } else {
      if (!this.divided) this.subdivide();

      // Insert the point in the first quadrant that contains it then return immediately.
      // This helps reduce the number of operations, and prevents inserting the point
      // twice, in case it's right on the edge of multiple bounds
      const inserted = this.quadrants.some((quadrant) => {
        if (quadrant.bounds.contains(pointData)) {
          quadrant.insert(point);
          return true;
        }
        return false;
      });

      if (!inserted) throw new Error(`the point doesn't fit in any quadrant: ${pointData}`);
    }
  }

  /**
   * Insert multiple points at the same time in the quadtree
   * @param {Array<Object>} points
   */
  insertMulti(points) {
    points.forEach((point) => this.insert(point));
  }

  /**
   * @param {Array} data
   */
  setData(data) {
    this.data = data;
    this.indexMode = true;

    // find out if the given data is a flat array, or a 2d array
    if (data[0].length === undefined) this.flatData = true;

    const pointCount = this.flatData ? this.data.length / 2 : this.data.length;
    for (let idx = 0; idx < pointCount; idx += 1) this.insert(idx);
  }

  /**
   * @private
   * @param {Number} pointIdx
   * @return {Object} The point corresponding to the given index
   */
  _point(pointIdx) {
    if (this.flatData) {
      const start = pointIdx * 2;
      return this.data.slice(start, start + 2);
    } else {
      return this.data[pointIdx];
    }
  }

  /**
   * @param {Rectangle} queryBounds
   * @return {Array<Object>} the list of all the points inside the given bounds
   */
  getPoints(queryBounds) {
    // eslint-disable-next-line no-param-reassign
    if (!(queryBounds instanceof Rectangle)) queryBounds = Rectangle.fromObj(queryBounds);

    if (!queryBounds.intersects(this.bounds)) return [];

    if (this.divided) {
      const pointLists = this.quadrants.map((quadrant) => quadrant.getPoints(queryBounds));
      return [].concat(...pointLists);
    }

    if (this.indexMode) {
      return this.points
          .map((pointIdx) => {
            if (queryBounds.contains(this._point(pointIdx))) return pointIdx;
            return null;
          })
          .filter((item) => item !== null);
    } else {
      return this.points.filter((point) => queryBounds.contains(point));
    }
  }
}
