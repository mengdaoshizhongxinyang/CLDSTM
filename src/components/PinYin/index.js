'use strict'

const pinyin = require('./core')
const patcher56L = require('./patchers/56l')
console.log(pinyin.isSupported() && patcher56L.shouldPatch(pinyin.genToken))
if (pinyin.isSupported() && patcher56L.shouldPatch(pinyin.genToken)) {
  pinyin.patchDict(patcher56L)
}

module.exports = pinyin
