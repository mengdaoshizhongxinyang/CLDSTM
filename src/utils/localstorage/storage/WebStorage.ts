import { WebStorageEvent } from './WebStorageEvent';
import {storage} from "./storage";
/**
 * Storage Bridge
 */
export class WebStorage {
  /**
   * @param {Object} storage
   */
  options:{
    namespace?:string,
    events?:Array<string>
  }
  length:Number=0
  storage:storage

  constructor(storage:Object) {
    this.storage = storage as storage;
    this.options = {
      namespace: '',
      events: ['storage'],
    };

    Object.defineProperty(this, 'length', {
      /**
       * Define length property
       *
       * @return {number}
       */
      get() {
        return this.storage.length;
      },
    });

    if (typeof window !== 'undefined') {
      for (const i in this.options.events) {
        window.addEventListener(i, WebStorageEvent.emit, false);
      }
    }
  }

  /**
   * Set Options
   *
   * @param {Object} options
   */
  setOptions<T extends {}=any>(options:T = ({} as T)) {
    this.options = Object.assign(this.options, options);
  }

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @param {number} expire - seconds
   */
  set(name:string, value:any, expire = null) {
    const stringifyValue = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire! : null,
    });

    this.storage.setItem(this.options.namespace + name, stringifyValue);
  }

  /**
   * Get item
   *
   * @param {string} name
   * @param {*} def - default value
   * @returns {*}
   */
  get<T>(name :string, def:T |null = null) {
    const item = this.storage.getItem(this.options.namespace + name);

    if (item !== null) {
      try {
        const data = JSON.parse(item);

        if (data.expire === null) {
          return data.value as T;
        }

        if (data.expire >= new Date().getTime()) {
          return data.value as T;
        }

        this.remove(name);
      } catch (err) {
        return def;
      }
    }

    return def;
  }

  /**
   * Get item by key
   *
   * @param {number} index
   * @return {*}
   */
  key(index :Number) {
    return this.storage.key(index);
  }

  /**
   * Remove item
   *
   * @param {string} name
   * @return {boolean}
   */
  remove(name:string) {
    return this.storage.removeItem(this.options.namespace + name);
  }

  /**
   * Clear storage
   */
  clear() {
    if (this.length === 0) {
      return;
    }

    const removedKeys = [];

    for (let i = 0; i < this.length; i++) {
      const key = this.storage.key(i);
      const regexp = new RegExp(`^${this.options.namespace}.+`, 'i');

      if (regexp.test(key) === false) {
        continue;
      }

      removedKeys.push(key);
    }

    for (const key in removedKeys) {
      this.storage.removeItem(removedKeys[key]);
    }
  }

  /**
   * Add storage change event
   *
   * @param {string} name
   * @param {Function} callback
   */
  on(name:string, callback:Function) {
    WebStorageEvent.on(this.options.namespace + name, callback);
  }

  /**
   * Remove storage change event
   *
   * @param {string} name
   * @param {Function} callback
   */
  off(name:string, callback:Function) {
    WebStorageEvent.off(this.options.namespace + name, callback);
  }
}
