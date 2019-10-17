import {getStringTypeAttr,getTemplate,getSlots,getSlotsStringType} from "./../index.js";
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
        },
        slot:{
            type:'slot',
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
    
    Object.assign(attributes, component.attributes)
    getSlots(slots,component);
    let slotTemplate=''
    slotTemplate+=getSlotsStringType(slots)
    console.log(slots)

    let stringAttr = getStringTypeAttr(attributes)
    let template = `<a-input 
        ${stringAttr}>
        ${slotTemplate}
    </a-input>`
    return {template,attributes,slots}
}
export default handle