/** @module worker */

// TODO: Try using shared memory to avoid transfer costs
// https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast
// https://github.com/lars-t-hansen/js-lock-and-condition
// https://hacks.mozilla.org/2017/06/a-crash-course-in-memory-management/

const actions = {};
const sharedData = {};

/** Initialize the WorkerHandler */
function init() {
  self.onmessage = handleMessage;
  actions.setData = setData;
}

/**
 * Handles messages received by the handler
 * @param {Object} message
 */
async function handleMessage(message) {
  const methodName = message.data.method;
  const params = msg.data.payload;
  const output = await actions[methodName](...params);
  postMessage({
    result: output,
    id: msg.data.id,
    method: msg.data.method,
  });
}

/**
 * Use this to transfer data to the worker, to avoid expensive transfers during repeated method
 * calls
 * @param {string} key
 * @param {*} data
 */
function setData(key, data) {
  sharedData[key] = data;
}

init();
