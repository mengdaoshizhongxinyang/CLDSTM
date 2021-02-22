/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-22 09:20:23
 * @Description: 
 */
import { PropType as VuePropTypes, CSSProperties } from "vue";


const createTypes = {
  string: String,
  number: Number,
  bool: Boolean,
  object: Object,
  array: Array,
  func: Function
}
type TypeKeys = keyof typeof createTypes
const typeDefault: {
  [p in TypeKeys]: ReturnType<typeof createTypes[p]>
} = {
  string: '',
  number: 0,
  bool: false,
  object: {},
  array: [],
  func: () => { }
}
export namespace PropTypes {
  export type Options = {
    type: TypeKeys
    default?: (typeof typeDefault)[Type]
    validator?: string
  }
}
// export class PropTypes{
//   private type?: VuePropTypes<unknown>  | VuePropTypes<unknown>[]
//   private defaultValue?: unknown
//   private validator?: string
//   constructor({ type, default: defaultValue, validator }: PropTypes.Options) { }
//   addBaseTypes({ type, default: defaultValue, validator }: PropTypes.Options)
//   addBaseTypes<T>({ type, default: defaultValue, validator }: PropTypes.Options)
//   addBaseTypes({ type, default: defaultValue, validator }: PropTypes.Options){
//     this.type=type
//     return this
//   }
//   addOtherTypes<T>({ type, default: defaultValue, validator }: PropTypes.Options<NT>): PropTypes<T | NT> {
//     this.type
//     return this
//   }
//   get() {
//     return this.type
//   }
// }//[T1,T2,T3]
export declare class PropTypes{
  private type?: VuePropTypes<unknown> | VuePropTypes<unknown>[]
  private defaultValue?: unknown
  private validator?: string
  add({ type, default: defaultValue, validator }: PropTypes.Options):PropTypes
  add<T>({ type, default: defaultValue, validator }: PropTypes.Options):PropTypes
}//[T1,T2,T3]

const propBuild1 = new PropTypes({ type: 'number' })
const propBuild3 = new PropTypes()
  .addBaseTypes({ type: 'number' }).get()
const propBuild2 = new PropTypes({ type: 'number' }).get()

