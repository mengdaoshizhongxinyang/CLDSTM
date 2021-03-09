/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-08 14:01:56
 * @Description: 
 */
import { Scene,RenderTarget } from "three";
interface Render {

}
declare namespace Proton {
  /*
    * EventDispatcher
    * Visit http://createjs.com/ for documentation, updates and examples.
    *
    **/
  class EventDispatcher {
    constructor()
    initialize(target:HTMLCanvasElement): void
  };
  class Rate {
    constructor(numPan: number[] | number | Span, timePan: number[] | number | Span)
  }
  class Emitter {
    constructor()
    initializes: Array<any>
    rate: Rate
    addInitialize: (...args: any[]) => void;

  }
  /**
   * Span Class. Get a random Number from a to b. Or from c-a to c+b
   * @param {Number|Array} a - min number
   * @param {Number} b - max number
   * @param {Number} center - the center's z value  
   * @example 
   * var span = new Proton.Span(0,30);
   * or
   * var span = new Proton.Span(["#fff","#ff0","#000"]);
   * or
   * var span = new Proton.Span(5,1,"center");
   * @extends {Zone}
   * @constructor
   */
  class Span {
    constructor(a: number | number[], b: number)
  }

  /**
    * Mass is init particle's Mass
    * @param {Number} a - the Mass's start point
    * @param {Number} b - the Mass's end point  
    * @param {String} c - span's center 
    * @example 
    * var Mass = new Proton.Mass(3,5);
    * or
    * var Mass = new Proton.Mass(Infinity);
    * @extends {Initialize}
    * @constructor
    */
  class Mass {
    constructor(a?: number, b?: number, c?: string)
  }

  Proton.Util.inherits(Mass, Proton.Initialize);
  Mass.prototype.initialize = function (target) {
    target.mass = this.massPan.getValue();
  };

  class Initialize {
    constructor()
    name: string
    reset: () => void
  }
  class SpriteRender extends Render {
    constructor(scene?: Scene)
  }


}
/**
 * @name Proton is a particle engine for three.js
 *
 * @class Proton
 * @param {number} preParticles input any number
 * @param {number} integrationType input any number
 * @example var proton = new Proton(200);
 */
declare class Proton {
  //the max particle number in pool
  static POOL_MAX: number
  static TIME_STEP: number
  static PI: number;
  static DR: number;

  //default 1:100
  static MEASURE: number;
  static EULER: string;
  static RK2: string;
  static RK4: string;
  static VERLET: string;

  static PARTICLE_CREATED: string;
  static PARTICLE_UPDATE: string;
  static PARTICLE_SLEEP: string;
  static PARTICLE_DEAD: string;
  static PROTON_UPDATE: string;
  static PROTON_UPDATE_AFTER: string;
  static EMITTER_ADDED: string;
  static EMITTER_REMOVED: string;
  constructor(preParticles?: number, integrationType?: number)

  emitters: Emitter[]
  renderers: Render[]
  /**
   * @name add a type of Renderer
   *
   * @method addRender
   * @param {Renderer} render
   */
  addRender(renderer: Render): void
  /**
   * @name add a type of Renderer
   *
   * @method addRender
   * @param {Renderer} render
   */
  removeRender(renderer: Render): void

  /**
    * add the Emitter
    *
    * @method addEmitter
    * @param {Emitter} emitter
    */
  addEmitter(emitter: Emitter): void

  removeEmitter(emitter: Emitter): void

  update(delta: number): void

  /**
    * getCount
    * @name get the count of particle
    * @return (number) particles count
    */
  getCount(): number

  /**
    * destroy
    * @name destroy the proton
    */
  destroy(): void


  static Util: {
    initValue: <V, D>(value: V, defaults: D) =>
      V extends (undefined | null) ? D : V

    isArray: <V>(value: V) => boolean

    destroyArray: <T>(array: Array<T>) => void

    destroyObject: <T extends { [key: string]: any }>(obj: T) => void

    isUndefined: (...args: any[]) => boolean


  }
}
export = Proton
export as namespace Proton;
