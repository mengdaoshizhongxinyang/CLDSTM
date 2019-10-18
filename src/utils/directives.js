import drap from "./drap.js";
import rightclick from "./rightclick.js";
const directives={
    drap,
    rightclick
}
export default{
    install(Vue){
        Object.keys(directives).forEach(key=>{
            Vue.directive(key, directives[key]);
        })
    }
}