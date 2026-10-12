const store = new Map();

global.GM_addStyle = jest.fn();
global.GM_getValue = jest.fn((k, d) => (store.has(k) ? store.get(k) : d));
global.GM_setValue = jest.fn((k, v) => {
  store.set(k, v);
});
global.GM_registerMenuCommand = jest.fn();
global.GM_xmlhttpRequest = jest.fn();

beforeEach(() => {
  store.clear();
  jest.clearAllMocks();
});
