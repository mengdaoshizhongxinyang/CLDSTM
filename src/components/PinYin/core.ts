/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-11 10:29:04
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { PINYINS,UNIHANS,EXCEPTIONS } from "./dict";
import { patcher,shouldPatch } from "./patchers/56l";
import { token } from "./type";
const FIRST_PINYIN_UNIHAN = '\u963F'
const LAST_PINYIN_UNIHAN = '\u9FFF'

const LATIN = 1
const PINYIN = 2
const UNKNOWN = 3

let supported :boolean|null = null
let COLLATOR:Intl.Collator

const patchDict=function(patchers?:Array<Function>|Function) {
  if (!patchers) return
  if (typeof patchers === 'function') {
    patchers = [patchers]
  }
  if (patchers.forEach) {
    patchers.forEach(p => {
      typeof p === 'function' && p({PINYINS,UNIHANS,EXCEPTIONS})
    })
  }
}

const isSupported=function(force?:boolean) {
  if (!force && supported !== null) {
    return supported
  }
  if (typeof Intl === 'object' && Intl.Collator) {
    COLLATOR = new Intl.Collator(['zh-Hans-CN', 'zh-CN'])
    supported = Intl.Collator.supportedLocalesOf(['zh-CN']).length === 1
  } else {
    supported = false
  }
  return supported
}


const genToken=function (ch:string) {
  // Access DICT here, give the chance to patch DICT.
  const token:token = {
    source: ch
  }

  // First check EXCEPTIONS map, then search with UNIHANS table.
  if (ch in EXCEPTIONS) {
    token.type = PINYIN
    token.target = EXCEPTIONS[ch as keyof typeof EXCEPTIONS]
    return token
  }

  let offset = -1
  let cmp
  if (ch.charCodeAt(0) < 256) {
    token.type = LATIN
    token.target = ch
    return token
  } else {
    cmp = COLLATOR.compare(ch, FIRST_PINYIN_UNIHAN)
    if (cmp < 0) {
      token.type = UNKNOWN
      token.target = ch
      return token
    } else if (cmp === 0) {
      token.type = PINYIN
      offset = 0
    } else {
      cmp = COLLATOR.compare(ch, LAST_PINYIN_UNIHAN)
      if (cmp > 0) {
        token.type = UNKNOWN
        token.target = ch
        return token
      } else if (cmp === 0) {
        token.type = PINYIN
        offset = UNIHANS.length - 1
      }
    }
  }

  token.type = PINYIN
  if (offset < 0) {
    let begin = 0
    let end = UNIHANS.length - 1
    while (begin <= end) {
      offset = ~~((begin + end) / 2)
      let unihan = UNIHANS[offset]
      cmp = COLLATOR.compare(ch, unihan)

      // Catch it.
      if (cmp === 0) {
        break
      }
      // Search after offset.
      else if (cmp > 0) {
        begin = offset + 1
      }
      // Search before the offset.
      else {
        end = offset - 1
      }
    }
  }

  if (cmp < 0) {
    offset--
  }

  token.target = PINYINS[offset]
  if (!token.target) {
    token.type = UNKNOWN
    token.target = token.source
  }
  return token
}
const parse=function(str:unknown):token[]{
  if (typeof str !== 'string') {
    throw new Error('argument should be string.')
  }
  if (!isSupported()) {
    throw new Error('not support Intl or zh-CN language.')
  }
  let a=str.split('').map(v => genToken(v))
  return str.split('').map(v => genToken(v))
}
const convertToPinyin=function(str:string, separator:string, lowerCase:boolean) {
  return parse(str).map(v => {
    if (lowerCase && v.type === PINYIN) {
      return v.target!.toLowerCase()
    }
    return v.target
  }).join(separator || '')
}
export {
  patchDict,
  isSupported,
  genToken,
  parse,
  convertToPinyin
}