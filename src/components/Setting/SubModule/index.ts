/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-24 09:55:05
 * @Description: 
 */
import * as LanguageModule from "./LanguageSettingModule"
const SubModule={
  ...LanguageModule
}
export default SubModule
export type SubModuleName=keyof typeof SubModule | 'Main'