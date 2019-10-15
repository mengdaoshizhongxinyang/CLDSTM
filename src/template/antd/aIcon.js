import {getStringTypeAttr,getTemplate,getSlots ,getSlotsStringType} from "./../index.js";
const handle = function (component) {
    let attributes = {
        style: {
            type: 'string',
            value: ''
        },
        component: {
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
        rotate:{
            type:'number',
            value:0
        },
        slot:{
            type:'slot',
            value:''
        }
    },
        slots = {
        }

        console.log(1)
        Object.assign(attributes, component.attributes)
        getSlots(slots,component)
        let slotTemplate=getSlotsStringType(slots)

        let stringAttr = getStringTypeAttr(attributes)
        let template = `<a-icon
            ${stringAttr}>
            ${slotTemplate}
        </a-icon>`
        return { template,attributes,slots }
}
export default handle