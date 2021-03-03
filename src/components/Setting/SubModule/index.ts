/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-24 09:55:05
 * @Description: 
 */
import Language from "./LanguageSettingModule"
import * as LanguageSettingModule from "./LanguageSettingModule/module"
import Personalise from "./PersonaliseSettingModule"
import * as PersonaliseSettingModule from "./PersonaliseSettingModule/module"

const SubModule={
  Language,
  Personalise
}

export default SubModule

type SubModuleName<T extends string,P={}>={[key in T]:{[key in keyof P]:P[key]}}

export type SubModuleNames=
  SubModuleName<'Main',typeof SubModule>
  & SubModuleName<'Language',typeof LanguageSettingModule>
  & SubModuleName<'Personalise',typeof PersonaliseSettingModule>
