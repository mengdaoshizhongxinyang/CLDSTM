import {getStringTypeAttr} from "./../index.js";
const handle = function (component) {
    let attributes = {
        style: {
            type: 'string',
            value: ''
        },
        addonBefore: {
            type: 'string',
            value: ''
        },
        theme: {
            type: 'text',
            value: ''
        },
        spin: {
            type: 'boolean',
            value: ''
        },
        type: {
            type: 'icon',
            value: ''
        },
        twoToneColor:{
            type: 'string',
            value: ''
        },
        slot:{
            type:'slot',
            value:''
        }
    },
        slots = {
        }

        let slotTemplate=''
        Object.assign(attributes, component.attributes)
        if(component.children!==undefined){
            component.children.forEach(ele=>{
                console.log(ele)
                if(ele.attributes.slot!==''){
                    slots[ele].push(ele)
                }else{
                    console.log(1)
                    slots['default'].push(ele)
                }
            })
        }
        console.log(slots)
        Object.keys(slots).forEach(ele=>{
            if(slots[ele].length>0){
                console.log(ele)
                if(ele!=='default'){
                    slotTemplate+=`<template v-slot:${ele}>`
                }
                slots[ele].forEach(temp=>{
                    slotTemplate+=getTemplate(temp).template
                })
                if(ele!=='default'){
                    slotTemplate+=`</template>`
                }
            }
        })
        let stringAttr = getStringTypeAttr(attributes)
        let template = `<a-icon
            ${stringAttr}>
            ${slotTemplate}
        </a-icon>`
        return {template,attributes,slots}
}
export default handle