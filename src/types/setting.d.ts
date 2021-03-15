/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-03 10:08:57
 * @Description: 
 */
declare type Setting<P extends string=string>={name?:string,icon:IconList,desc?:string,component?:P,title?:string}
declare type Settings={
  [key in keyof import("@/components/Setting/SubModule").SubModuleNames]:Setting<keyof SubModuleNames[key]>[]
}
