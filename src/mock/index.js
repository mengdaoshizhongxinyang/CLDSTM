const Mock = require('mockjs2')
require('./service/home.js')
Mock.setup({
  timeout: 800 // setter delay time
})