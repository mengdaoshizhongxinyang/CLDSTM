import Vue from 'vue'
import { getTemplate } from "@/template";
import components from "@/components";
console.log(components)
//给定模板，和要挂载的元素id，挂载组件   
var mount = function(id, _components) {
    
    return new Promise((resolve, reject) => {
        //需要延迟才能取到document.getElementById(id)
        setTimeout(() => {
            let data={}
            console.log(_components)
            let template='<div id="mbl">'
            _components.forEach(element => {
                console.log(element)
                template+=getTemplate(element).template+"\n"
            });
            template+='</div>'
            console.log(template)
            let vm = new Vue({
                name: id.toString(),
                components:components,
                data() {
                    return data
                },
                template:template,
                el: document.getElementById(id),
            })
            resolve(vm)

        }, 200)
    })
}

export default mount
