/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-24 09:55:05
 * @Description: 
 */
import Main from "./MainModule";
import Language from "./LanguageSettingModule"
import * as LanguageSettingModule from "./LanguageSettingModule/module"
import Personalise from "./PersonaliseSettingModule"
import * as PersonaliseSettingModule from "./PersonaliseSettingModule/module"

const SubModule={
  Main,
  Language,
  Personalise
}

export default SubModule

type SubModuleName<T extends string,P={}>={[key in T]:{[key in keyof P]:P[key]}}

export type SubModuleNames=
  SubModuleName<'Main',typeof SubModule>
  & SubModuleName<'Language',typeof LanguageSettingModule>
  & SubModuleName<'Personalise',typeof PersonaliseSettingModule>

type GetSubObjKeys<T>={
  [p in keyof T]:`${Extract<keyof T[p],string>}`
}[keyof T]
type GetSubObjConectKeys<T>={
  [p in keyof T]:`${Extract<p,string>}-${Extract<keyof T[p],string>}`
}[keyof T]
export type SubModuleSubKeys=GetSubObjConectKeys<SubModuleNames>
export type SubModuleKeys=GetSubObjKeys<SubModuleNames>
