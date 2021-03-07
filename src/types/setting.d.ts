/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-03 10:08:57
 * @Description: 
 */
import { SubModuleNames } from "@/components/Setting/SubModule";
import { IconList } from '@/types';
export type Setting<P extends string=string>={name?:string,icon:IconList,desc?:string,component?:P,title?:string}
export type Settings={
  [key in keyof SubModuleNames]:Setting<keyof SubModuleNames[key]>[]
}
