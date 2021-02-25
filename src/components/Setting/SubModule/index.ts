/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-24 09:55:05
 * @Description: 
 */
import * as LanguageModule from "./LanguageSettingModule"
import * as PersonaliseSettingModule from "./PersonaliseSettingModule"

const SubModule={
  ...LanguageModule,
  ...PersonaliseSettingModule
}
// const SubModule=Object.assign({},LanguageModule,PersonaliseSettingModule,{Main:Main})
export default SubModule
export type SubModuleName=keyof typeof SubModule | 'Main'