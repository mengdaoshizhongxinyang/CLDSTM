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
            type: 'string',
            value: ''
        },
        disabled: {
            type: 'string',
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
    let template = `<mu-card 
        ${stringAttr}>
        ${subContent || '&nbsp;'}
    </mu-card>`
}
export default handle