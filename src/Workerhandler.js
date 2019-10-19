/** @module worker */

/**
 * Improved service worker interface: This behaves (almost) like calling a regular async function
 * @example
 * const worker = new WorkerHandler('path/to/worjer.js');
 * const result = await worker.run('myMethod', argument1, argument2);
 */
export default class WorkerHandler {
  /**
   * 
   * @param {string} workerSrc path to the worker file. The worker must be based on the WorkerWrapper class
   */
  constructor(workerSrc) {
    this.worker = new Worker(workerSrc);
    this.callbacks = [];
    this.taskId = 0;
    this.worker.onmessage = this.onmessage.bind(this);
    this.currentMethods = {};
  }

  run(method, ...args) {
    if (!this.currentMethods[method]) this.currentMethods[method] = [];
    this.currentMethods[method].push(this.taskId);

    const promise = new Promise((resolve) => {
      this.callbacks[this.taskId] = resolve;
      this.worker.postMessage({ method, payload: args, id: this.taskId });
    });
    this.taskId += 1;
    return promise;
  }

  /** Same as run(), but only allow a single call at a time. If a call is
   * currently in progress, do nothing */
  runSingle(method, ...args) {
    if (method in this.currentMethods && this.currentMethods[method].length > 0) {
      return Promise.resolve(null);
    }
    return this.run(method, ...args);
  }

  setData(key, data) {
    this.run('setData', key, data);
  }

  onmessage(msg) {
    this.callbacks[msg.data.id](msg.data.result);

    const methodList = this.currentMethods[msg.data.method];
    methodList.splice(methodList.indexOf(msg.data.id));
  }
}
