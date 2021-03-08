/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-08 14:01:56
 * @Description: 
 */
import { Scene } from "three";
interface Render {

}
declare namespace Proton {
  //the max particle number in pool
  type POOL_MAX = number
  type TIME_STEP = number
  type PI = number
  type DR = number


  //1:100
  type MEASURE = number
  type EULER = number
  type RK2 = string;
  type RK4 = string;
  type VERLET = string;

  type PARTICLE_CREATED = string;
  type PARTICLE_UPDATE = string;
  type PARTICLE_SLEEP = string;
  type PARTICLE_DEAD = string;
  type PROTON_UPDATE = string;
  type PROTON_UPDATE_AFTER = string;
  type EMITTER_ADDED = string;
  type EMITTER_REMOVED = string;

  type bindEmtterEvent = boolean;


  class Rate {
    constructor(numPan: number[] | number | Span, timePan: number[] | number | Span)
  }
  class Emitter {
    constructor()
    initializes: Array<any>
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

  class SpriteRender extends Render{
    constructor(scene?:Scene)
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
  constructor(preParticles?: number, integrationType?: number)
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
}
export = Proton
export as namespace Proton;
