/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-08 14:01:56
 * @Description: 
 */
import { Emitter } from "monaco-editor";
import { Scene, RenderTarget, Vector3, Texture, Euler, Vector2 } from "three";
interface Render {

}
interface protonObj {
  x?: number
  y?: number
  z?: number

  vx?: number
  vy?: number
  vz?: number

  ax?: number
  ay?: number
  az?: number

  p?: number
  v?: number
  a?: number

  position?: number
  velocity?: number
  accelerate?: number
}
interface colorRGB {
  r: number
  g: number
  b: number
  a?: number
}

declare namespace Proton {
  /*
    * EventDispatcher
    * Visit http://createjs.com/ for documentation, updates and examples.
    *
    **/
  class EventDispatcher {
    constructor()
    initialize(target: any): void

    addEventListener<T>(type: keyof GlobalEventHandlersEventMap, listener: () => T): () => T

    removeEventListener<T>(type: keyof GlobalEventHandlersEventMap, listener: () => T): void

    removeAllEventListeners(type: keyof GlobalEventHandlersEventMap): void

    dispatchEvent(eventName: string, eventTarget: any): boolean

    hasEventListener(type: keyof GlobalEventHandlersEventMap): boolean
  };

  /**
 * the Particle class
 * @param {Number} pObj - the parameters of particle config;
 * @example 
 * var p = new Proton.Particle({life:3,dead:false});
 * or
 * var p = new Proton.Particle({mass:1,radius:100});
 * @constructor
 */
  class Particle {
    static ID: number
    constructor(pOBJ: protonObj)
    id: string
    name: string
    life: number
    age: number
    energy: number
    dead: boolean
    sleep: boolean
    body: ObjectConstructor
    parent: ObjectConstructor
    mass: number
    radius: number

    alpah: number
    scale: number

    rotation: number
    color: colorRGB

    getDirection: () => number
    easing: FunctionConstructor

    p: Vector3D
    v: Vector3D
    a: Vector3D
    rotation: Vector3D
    old: {
      p: Vector3D
      v: Vector3D
      a: Vector3D
    }

    transform: ObjectConstructor
    behaviours: Behaviour[]
    /**
     * @property {Number}  life               - The particle's life
     * @property {Number}  age               - The particle's age
     * @property {Number}  energy               - The particle's energy loss
     * @property {Boolean}  dead               - The particle is dead?
     * @property {Boolean}  sleep               - The particle is sleep?
     * @property {Object}  target               - The particle's target
     * @property {Object}  body               - The particle's body
     * @property {Number}  mass               - The particle's mass
     * @property {Number}  radius               - The particle's radius
     * @property {Number}  alpha               - The particle's alpha
     * @property {Number}  scale               - The particle's scale
     * @property {Number}  rotation               - The particle's rotation
     * @property {String|Number}  color               - The particle's color
     * @property {Function}  easing               - The particle's easing
     * @property {Proton.Vector3D}  p               - The particle's position
     * @property {Proton.Vector3D}  v               - The particle's velocity
     * @property {Proton.Vector3D}  a               - The particle's acceleration
     * @property {Array}  behaviours               - The particle's behaviours array
     * @property {Object}  transform               - The particle's transform collection
     */
    reset(init: string): Particle

    update(time: number, index: number): void

    addBehaviour(behaviour: Behaviour): void

    addBehaviours(behaviours: Behaviour[]): void

    removeBehaviour(behaviour: Behaviour): void

    removeAllBehaviours(): void

    /**
     * Destory this particle
     * @method destroy
     */
    destroy(): void
  }

  class Pool {
    constructor()
    cID: number
    list: ObjectConstructor

    create<T>(obj: T): typeof obj

    getCount(): void

    get(obj): any

    expire(obj): number

    destroy(): void

    _getList(uid: string): ArrayConstructor
  }
  //数值积分
  class Integration {
    constructor(type?: string)
    type: string

    integrate(particle: Particle, time: number, damping: number): void
    euler(particle: Particle, time: number, damping: number): void
  }
  class Vector3D {
    constructor(x?: number, y?: number, z?: number)
    x: number
    y: number
    z: number

    set(x: number, y: number, z: number): Vector3D

    setX(x: number): Vector3D

    setY(y: number): Vector3D

    setZ(z: number): Vector3D

    getGradient(): number

    copy(v: Vector3D): Vector3D

    add(v: Vector3D, w: Vector3D): Vector3D

    addValue(a: number, b: number, c: number): Vector3D

    addVectors(a: Vector3D, b: Vector3D): Vector3D

    addScalar(s: number): Vector3D

    sub(v: Vector3D, w: Vector3D): Vector3D

    subVectors(a: Vector3D, b: Vector3D): Vector3D

    scalar(s: number): Vector3D

    divideScalar(s: number): Vector3D

    negate(): Vector3D

    dot(v: Vector3D): Vector3D

    cross(v: Vector3D): Vector3D

    lengthSq(): number

    length(): number

    normalize(): Vector3D

    distanceTo(): number

    crossVectors(a: Vector3D, b: Vector3D): Vector3D

    eulerFromDir(dir: any): void

    applyEuler(): (euler: Euler) => Quaternion

    applyAxisAngle(): (axis: number, angle: number) => Quaternion

    applyQuaternion(q: Quaternion): Vector3D

    distanceToSquared(v: Vector3D): number

    lerp(v: Vector3D, alhpa: number): Vector3D

    equals(v: Vector3D): boolean

    clear(): Vector3D

    clone(): Vector3D

    toString(): string
  }

  class Polar3D {
    constructor(radius?: number, theta?: number, phi?: number)
    radius: number
    phi: number
    theta: number

    set(radius?: number, theta?: number, phi?: number): Polar3D

    setRadius(radius: number): Polar3D

    setPhi(phi: number): Polar3D

    setTheta(theta: number): Polar3D

    copy(p: Polar3D): Polar3D

    toVector3D(): Vector3D

    getX(): number

    getY(): number

    getZ(): number

    normalize(): void

    equals(v: Vector3D): boolean

    clear(): void

    clone(): Polar3D
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
    _isArray: boolean
    _center: number
    a: number[] | number
    b: number
    /**
     * Span.getValue function
     * @name get a random Number from a to b. Or get a random Number from c-a to c+b
     * @param {number} INT or int
     * @return {number} a random Number
     */
    getValue(INT?: boolean): number
  }

  /**
   * ArraySpan name get a random Color from a colors array
   * @param {String|Array} colors - colors array
   * @example 
   * var span = new Proton.ArraySpan(["#fff","#ff0","#000"]);
   * or
   * var span = new Proton.ArraySpan("#ff0");
   * @extends {Proton.Span}
   * @constructor
   */
  class ArraySpan {
    constructor(colors: string | string[])
    _arr: string[]

    getValue(): string
  }

  class Quaternion {
    constructor(x?: number, y?: number, z?: number, z?: number)
    x: number
    y: number
    z: number
    w: number

    set(x: number, y: number, z: number, w: number): Quaternion

    clone(): Quaternion

    copy(quaternion: Quaternion): Quaternion

    setFromEuler(euler: Euler): Quaternion

    setFromAxisAngle(axis: number, angle: number): Quaternion

    normalize(): Quaternion

    length(): number

    dot(v: Quaternion): number
  }

  class Box {
    constructor(x: number, y: number, z: number, w: number, h: number, d: number)
    x: number
    y: number
    z: number
    width: number
    height: number
    depth: number
    bottom: number
    right: number

    contains(x: number, y: number, z: number): boolean
  }

  /**
   * The Behaviour class is the base for the other Behaviour
   *
   * @class Behaviour
   * @constructor
   */
  class Behaviour {
    constructor(life: number, easing: string)
    /**
     * The behaviour's id;
     * @property id
     * @type {String} id
     */
    id: string
    life: number
    /**
     * The behaviour's decaying trend, for example Proton.easeOutQuart;
     * @property easing
     * @type {String}
     * @default Proton.easeLinear
     */
    easing: string
    age: number
    energy: number
    /**
     * The behaviour is Dead;
     * @property dead
     * @type {Boolean}
     */
    dead: boolean
    /**
     * The behaviour name;
     * @property name
     * @type {string}
     */
    name: string
    static id: number

    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @param {Number} this behaviour's life
     * @param {String} this behaviour's easing
     */
    reset(life: number, easing: string)
    /**
     * Normalize a force by 1:100;
     *
     * @method normalizeForce
     * @param {Proton.Vector2D} force 
     */
    normalizeForce(force: Vector3D): Vector3D
    /**
    * Initialize the behaviour's parameters for all particles
    *
    * @method initialize
    * @param {Proton.Particle} particle
    */
    initialize(particle: Particle): void
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    applyBehaviour(particle: Particle, time: number, index?: number): void

    /**
     * Destory this behaviour
     * @method destroy
     */
    destory(): void
  }
  /**
 * The number of particles per second emission (a [particle]/b [s]);
 * @class Proton.Rate
 * @constructor
 * @param {Array or Number or Proton.Span} numPan the number of each emission;
 * @param {Array or Number or Proton.Span} timePan the time of each emission;
 * for example: new Proton.Rate(new Proton.Span(10, 20), new Proton.Span(.1, .25));
 */
  class Rate {
    constructor(numPan: number[] | number | Span, timePan: number[] | number | Span)
    numPan: number
    timePan: number

    startTime: number
    nextTime: number

    init(): void

    getValue(time: number): number
  }

  class Initialize {
    constructor()
    name: string
    reset(): void
    init(emitter: Emitter, particle: Particle)
  }
  /**
 * Life is init particle's Life
 * @param {Number} a - the Life's start point
 * @param {Number} b - the Life's end point  
 * @param {String} c - span's center 
 * @example 
 * var life = new Proton.Life(3,5);
 * or
 * var life = new Proton.Life(Infinity);
 * @extends {Initialize}
 * @constructor
 */
  class Life extends Initialize {
    constructor(a: number, b: number, c?: string)
  }
  class Emitter {
    constructor()
    initializes: Array<any>
    rate: Rate
    p:Vector3D
    addInitialize: (...args: any[]) => void;
    /**
     * add the Behaviour to particles;
     * 
     * you can use Behaviours array:emitter.addBehaviour(Behaviour1,Behaviour2,Behaviour3);
     * @method addBehaviour
     * @param {Behaviour} behaviour like this new Color('random')
     */
    addBehaviour: (...args: any[]) => void;

    emit:()=>void
  }

  /**
   * Radius is init particle's Radius
   * @param {Number} a - the Radius's start point
   * @param {Number} b - the Radius's end point  
   * @param {String} c - span's center 
   * @example 
   * var Radius = new Proton.Radius(3,5);
   * or
   * var Radius = new Proton.Radius(3,1,"center");
   * @extends {Initialize}
   * @constructor
   */
  class Radius extends Initialize {
    constructor(a: number | Span, b?: number, c?: string)
    radius: Span;
  }

  class Position extends Initialize {
    constructor()
    zones: ArrayConstructor
    addZone(...args: any[]): void
  }

  /**
   * BoxZone is a box zone
   * @param {Number|Proton.Vector3D} x - the position's x value or a Proton.Vector3D Object
   * @param {Number} y - the position's y value 
   * @param {Number} z - the position's z value 
   * @param {Number} w - the Box's width 
   * @param {Number} h - the Box's height 
   * @param {Number} d - the Box's depth 
   * @example 
   * var boxZone = new Proton.BoxZone(0,0,0,50,50,50);
   * or
   * var boxZone = new Proton.BoxZone(new Proton.Proton.Vector3D(0,0,0), 50, 50, 50);
   * @extends {Proton.Zone}
   * @constructor
   */
  class BoxZone extends Initialize {
    constructor(a: number | Vector3D, b?: number, c?: number, d?: number, e?: number, f?: number)
  }

  class Body extends Initialize {
    constructor(body: any, w?: number, h?: number)
    body: Span
    w: number
    h: number
  }

  class Velocity extends Initialize {
    constructor(a, b, c)
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

  emitters: Proton.Emitter[]
  renderers: Proton.Render[]
  /**
   * @name add a type of Renderer
   *
   * @method addRender
   * @param {Renderer} render
   */
  addRender(renderer: Proton.Render): void
  /**
   * @name add a type of Renderer
   *
   * @method addRender
   * @param {Renderer} render
   */
  removeRender(renderer: Proton.Render): void

  /**
    * add the Emitter
    *
    * @method addEmitter
    * @param {Emitter} emitter
    */
  addEmitter(emitter: Proton.Emitter): void

  removeEmitter(emitter: Proton.Emitter): void

  update(delta?: number): void

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

    setVectorByObj: (target: any, pOBJ: Proton.Particle) => void

    //set prototype
    setPrototypeByObj: (target: any, proObj: Proton, filter: string) => any

    _getValue: (pan: Proton.Span) => Proton.Span

    inherits: (subClass, superClass) => void
  }

  static ColorUtil: {
    getRGB: (color: colorRGB) => colorRGB
  }

  static THREEUtil: {
    toScreenPos: () => Vector3

    toSpacePos: () => Vector3

    getTexture: () => (img: string | Texture | HTMLImageElement) => typeof img
  }

  static PUID: {
    _id: number

    _uids: { [key: string]: number }

    id: (obj: number) => string

    hash: (str: any) => void
  }

  static MathUtils: {
    randomAToB: (a: number, b: number, INT?: boolean) => number

    randomFloating: (center: number, f: number, INT?: boolean) => number

    randomZone: (display) => void

    degreeTransform: (a: number) => number

    toColor16: (num: number) => string

    randomColor: () => string

    lerp: (a: number, b: number, energy: number) => number

    getNormal: (v: Proton.Vector3D, n: Proton.Vector3D) => Vector3

    /** 
     * Rodrigues' Rotation Formula 
     * https://en.wikipedia.org/wiki/Rodrigues%27_rotation_formula
     * v′ = vcos(θ) + k(k⋅v)(1−cos(θ)) + (k*v)sin(θ)
     */
    axisRotate: (v0: Proton.Vector3D, v: Proton.Vector3D, k: Proton.Vector3D, tha: number) => void


  }

  static InitializeUtil: {
    initialize(emitter: Proton.Emitter, particle: Proton.Particle, initializes: Proton.Initialize[]): void

    init(emitter: Proton.Emitter, particle: Proton.Particle, initialize?: Proton.Initialize): void

    bindEmitter(emitter: Proton.Emitter, particle: Proton.Particle): void
  }
  /**
   * Proton.createSpan function
   * @name get a instance of Span
   * @param {number} a min number
   * @param {number} b max number
   * @param {number} c center number
   * @return {number} return a instance of Span
   */
  static createSpan: (a: number, b: number, c: number) => number | Proton.Span

  /**
 * Proton.createArraySpan function
 * @name get a instance of Span
 * @param {number} a min number
 * @param {number} b max number
 * @param {number} c center number
 * @return {number} return a instance of Span
 */
  static createArraySpan: (arr?: string | string[] | Proton.ArraySpan) => Proton.ArraySpan | null


}
export = Proton
export as namespace Proton;
