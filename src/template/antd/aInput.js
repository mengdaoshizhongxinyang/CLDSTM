import {getStringTypeAttr} from "./../index.js";

const handle = function (_attr,_slots) {
    let attributes = {
        addonAfter: {
            type: 'icon',
            value: ''
        },
        addonBefore: {
            type: 'icon',
            value: ''
        },
        defaultValue: {
            type: 'text',
            value: ''
        },
        disabled: {
            type: 'text',
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
            suffix: []
        }

    Object.assign(slots, _slots)
    Object.assign(attributes, _attr)
    let stringAttr = getStringTypeAttr(attributes)
    let template = `<a-input 
        ${stringAttr}>
    </a-input>`
    return {template,attributes,slots}
}
export default handle