import { MemoryStorage, WebStorage } from './storage';
import {App} from "vue"
// eslint-disable-next-line
const _global = (typeof window !== 'undefined' ? window : globalThis || {});
/**
 * @type {{install: (function(Object, Object): WebStorage)}}
 */
interface options{
  storage?:string,
  name?:string
}
let webStorage:WebStorage
const VueStorage = {
  /**
   * Install plugin
   *
   * @param {Object} Vue
   * @param {Object} options
   * @returns {WebStorage}
   */
  install(Vue:App, options:options = {}) {
    const _options = Object.assign({}, options, {
      storage: options.storage || 'local',
      name: options.name || 'ls',
    });

    if (_options.storage && ['memory', 'local', 'session'].indexOf(_options.storage) === -1) {
      throw new Error(`Vue-ls: Storage "${_options.storage}" is not supported`);
    }

    let store = null;

    switch(_options.storage) { // eslint-disable-line
      case 'local':
        store = 'localStorage' in _global
          ? _global.localStorage
          : null
        ;
        break;

      case 'session':
        store = 'sessionStorage' in _global
          ? _global.sessionStorage
          : null
        ;
        break;
      case 'memory':
        store = MemoryStorage;
        break;
    }
    if (!store) {
      store = MemoryStorage;
      // eslint-disable-next-line
      console.error(`Vue-ls: Storage "${_options.storage}" is not supported your system, use memory storage`);
    }
    
    webStorage = new WebStorage(store);

    webStorage.setOptions(Object.assign(webStorage.options, {
      namespace: '',
    }, _options || {}));

    Vue.config.globalProperties[_options.name] = webStorage; // eslint-disable-line
    Object.defineProperty(Vue.config.globalProperties, `$${_options.name}`, {
      /**
       * Define $ls property
       *
       * @return {WebStorage}
       */
      get() {
        return webStorage;
      },
    });
  },
};
Object.assign(_global,{
  VueStorage:VueStorage
})
// _global.VueStorage = VueStorage;
let ws=()=>{
  return webStorage
}
export {
  ws
}
export default VueStorage;
