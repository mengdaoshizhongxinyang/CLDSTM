/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-08 09:36:26
 * @Description: 
 */
import { App, Directive } from "vue";
let directives:{
  [key: string]:Directive
}={}
Promise.all([
  import ("./drap")
]).then(([drap])=>{
  directives={
    drap:drap.default
  }
});

type Directives=typeof directives

export default {
  install(Vue: App) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    })
  }
}