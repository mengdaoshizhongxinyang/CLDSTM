const listeners = {} as {[key :string]:Array<Function> };

/**
 * Event class
 */
export class WebStorageEvent {
  /**
   * Add storage change event
   *
   * @param {string} name
   * @param {Function} callback
   */
  static on(name:string, callback:Function) {
    if (listeners[name] === undefined) {
      listeners[name] = [];
    }

    listeners[name].push(callback);
  }

  /**
   * Remove storage change event
   *
   * @param {string} name
   * @param {Function} callback
   */
  static off(name:string, callback:Function) {
    if (listeners[name].length) {
      listeners[name].splice(listeners[name].indexOf(callback), 1);
    } else {
      listeners[name] = [];
    }
  }

  /**
   * Emit event
   *
   * @param {Object} event
   */
  static emit(event:Event) {
    const e= (event || window.event) as Event&{key:string,newValue:string,oldValue:string,url:string,uri:string} 

    const getValue = (data:string) => {
      try {
        return JSON.parse(data).value;
      } catch (err) {
        return data;
      }
    };

    const fire = (listener:Function) => {
      const newValue = getValue(e.newValue);
      const oldValue = getValue(e.oldValue);

      listener(newValue, oldValue, e.url || e.uri);
    };

    if (typeof e === 'undefined' || typeof e.key === 'undefined') {
      return;
    }

    const all = listeners[e.key];

    if (typeof all !== 'undefined') {
      all.forEach(fire);
    }
  }
}
