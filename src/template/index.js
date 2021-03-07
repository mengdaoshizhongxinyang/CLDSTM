import Antd from "./antd";
import Design from "./design";
const getStringTypeAttr = function(attributes) {
    // value为空的不添加到模板中
    let stringAttr = ''
    Object.keys(attributes).forEach(key => {
        let attrKey
        let arr = ['text', 'selection', 'icon','color'] //这些类型都不用加bind
        if(attributes[key].type==='slot'){
            
        }else{
            if (arr.includes(attributes[key].type) || attributes[key].notBind) {
                attrKey = key
            } else {
                attrKey = `:${key}`
            }
            let attr = attributes[key].value ? `${attrKey}="${attributes[key].value}"\n` : ''
            stringAttr += attr
        }
    })
    return stringAttr
}


const getTemplate=function(_component){
    let component
    switch (_component.info.type) {
        case 'Antd':
            component=Antd[_component.info.name](_component)
            break;
        case 'Design':
            component=Design[_component.info.name](_component)
            break;
    }
    return component
}

const getSlots=function(slots,component){
    if(component.children!==undefined){
        component.children.forEach(ele=>{
            if(ele.attributes.slot.value!==''){
                slots[ele.attributes.slot.value].push(ele)
            }else{
                slots['default'].push(ele)
            }
        })
    }
}
const getSlotsStringType=function(slots){
    let childrenSlotTemplates=''
    Object.keys(slots).forEach(ele=>{
        if(slots[ele].length>0){
            if(ele!=='default'){
                childrenSlotTemplates+=`<template v-slot:${ele}>`
            }
            slots[ele].forEach(temp=>{
                childrenSlotTemplates+=getTemplate(temp).template
            })
            if(ele!=='default'){
                childrenSlotTemplates+=`</template>`
            }
        }
    })
    return childrenSlotTemplates;
}
export { getStringTypeAttr,getTemplate,getSlots ,getSlotsStringType}