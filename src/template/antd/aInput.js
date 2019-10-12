import {getStringTypeAttr,getTemplate} from "./../index.js";
const handle = function (component) {
    let attributes = {
        addonAfter: {
            type: 'string',
            value: ''
        },
        addonBefore: {
            type: 'string',
            value: ''
        },
        defaultValue: {
            type: 'string',
            value: ''
        },
        disabled: {
            type: 'boolean',
            value: ''
        },
        prefix: {
            type: 'icon',
            value: ''
        },
        suffix:{
            type: 'icon',
            value: ''
        },
        size:{
            type: 'text',
            value: ''
        },
        "v-model": {
            type: 'string',
            value:''
        }
    },
        slots = {
            addonAfter: [],
            addonBefore: [],
            prefix: [],
            suffix: [],
            default:[]
        }
    
    let slotTemplate=''
    Object.assign(attributes, component.attributes)
    if(component.children!==undefined){
        component.children.forEach(ele=>{
            console.log(ele)
            if(ele.attributes.slot.value!==''){
                slots[ele.attributes.slot.value].push(ele)
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
    let template = `<a-input 
        ${stringAttr}>
        ${slotTemplate}
    </a-input>`
    return {template,attributes,slots}
}
export default handle