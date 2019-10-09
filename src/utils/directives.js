import drap from "./drap.js";
const directives={
    drap,
}
export default{
    install(Vue){
        Object.keys(directives).forEach(key=>{
            Vue.directive(key, directives[key]);
        })
    }
}