/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-22 09:20:23
 * @Description: easy to build base props
 */
import { PropType } from "vue";
const createTypes = {
  string: String,
  number: Number,
  bool: Boolean,
  object: Object,
  array: Array,
  func: Function
}
type Validator = () => boolean
export const PropTypes = {
  string(defaultValue = '', validator?: Validator,required?:boolean) {
    return getTypes<string>('string', defaultValue, validator,required)
  },
  number(defaultValue = 0, validator?: Validator,required?:boolean) {
    return getTypes<number>('number', defaultValue, validator,required)
  },
  bool(defaultValue = false, validator?: Validator,required?:boolean) {
    return getTypes<boolean>('bool', defaultValue, validator,required)
  },
  array<T = any>(defaultValue: Array<T> = [], validator?: Validator,required?:boolean) {
    return getTypes<Array<T>>('array', defaultValue, validator,required)
  },
  object<T extends {}>(defaultValue: T = {} as T, validator?: Validator,required?:boolean) {
    return getTypes<T>('object', defaultValue, validator,required)
  },
  func<T extends ((...args: unknown[]) => unknown) = (() => unknown)>(defaultValue: T = ((() => { }) as T), validator?: Validator,required?:boolean) {
    return getTypes<T>('func', defaultValue, validator,required)
  },
  tuple<T>(defaultValue: T, validator?: Validator,required?:boolean) {
    return getTypes<T>('array', defaultValue, validator,required)
  },
  strings<T extends string=string>(defaultValue = '' as T, validator?: Validator,required?:boolean) {
    return getTypes<T>('string', defaultValue, validator,required)
  },
  numbers<T extends number=number>(defaultValue = 0 as T, validator?: Validator,required?:boolean) {
    return getTypes<T>('number', defaultValue, validator,required)
  }
}
type Types<T> = {
  type: PropType<T>
  default: T
  validator?: Validator
  required?:boolean
}
/**
 * if you don't need validator but need boolean,you can set validator undefined
 * next aims:can use chain call
 */
function getTypes<T = any>(type: keyof typeof createTypes, defaultValue: T, validator?: Validator,required?:boolean) {
  let types: Types<T> = {
    type: createTypes[type] as PropType<T>,
    default: defaultValue
  }
  if (validator) {
    types['validator'] = validator
  }
  if(required){
    types['required'] = required
  }
  return types
}
