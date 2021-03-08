/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-08 14:01:56
 * @Description: 
 */
import { Scene } from "three";
declare module "three.static js" {
  declare type Render = () => void
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

    static bindEmtterEvent: boolean;
    constructor(preParticles?: number, integrationType?: number): void
    /**
     * @name add a type of Renderer
     *
     * @method addRender
     * @param {Renderer} render
     */
    static addRender: (renderer: Renderer) => void
    /**
     * @name add a type of Renderer
     *
     * @method addRender
     * @param {Renderer} render
     */
    static removeRender: (renderer: Renderer) => void

    static Emitter: Emitter

  }

  declare class Emitter {
    constructor(): void
    initializes: Array<any>
  }

  export default Proton
}


