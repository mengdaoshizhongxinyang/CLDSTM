/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-11 10:42:11
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { patchDict,isSupported,genToken,convertToPinyin,parse } from "./core";
import { shouldPatch,patcher } from "./patchers/56l";
// const pinyin = require('./core')
// const patcher56L = require('./patchers/56l')
if (isSupported() && shouldPatch(genToken)) {
  patchDict(shouldPatch)
}
const pinyin={
  patchDict,
  isSupported,
  genToken,
  convertToPinyin,
  parse
}
export  default pinyin
