import {getStringTypeAttr,getTemplate,getSlots ,getSlotsStringType}  from "./../index.js";
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

        
        Object.assign(attributes, component.attributes)

        getSlots(slots,component);

        let slotTemplate=getSlotsStringType(slots)
        console.log(slots)
        let stringAttr = getStringTypeAttr(attributes)
        let template = `<a-button 
            ${stringAttr}>
            ${slotTemplate}
        </a-button>`
        return {template,attributes,slots}
}
export default handle