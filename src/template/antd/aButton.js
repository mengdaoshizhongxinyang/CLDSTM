import {getStringTypeAttr} from "./../index.js";
const handle = function (component) {
    let attributes = {
        disabled: {
            type: 'boolean',
            value: ''
        },
        ghost: {
            type: 'boolean',
            value: ''
        },
        htmlType: {
            type: 'text',
            value: ''
        },
        icon: {
            type: 'icon',
            value: ''
        },
        loading: {
            type: 'string',
            value: ''
        },
        shape:{
            type: 'string',
            value: ''
        },
        size:{
            type: 'string',
            value: ''
        },
        type:{
            type: 'string',
            value: ''
        },
        block:{
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
        let template = `<a-button 
            ${stringAttr}>
            ${slotTemplate}
        </a-button>`
        return {template,attributes,slots}
}
export default handle