import drap from "./drap";
import rightclick from "./rightclick";
import imglazy from "./imglazy";
const directives={
    drap,
    rightclick,
    imglazy
}
export default{
    install(Vue){
        Object.keys(directives).forEach(key=>{
            Vue.directive(key, directives[key]);
        })
    }
}