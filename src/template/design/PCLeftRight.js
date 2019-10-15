import {getStringTypeAttr,getTemplate,getSlots ,getSlotsStringType} from "./../index.js";
const handle = function (component) {
    let attributes = {
        leftStyle: {
            type: 'text',
            value: ''
        },
        rightStyle: {
            type: 'text',
            value: ''
        },
        slot:{
            type:'slot',
            value:''
        }
    },
        slots = {
            left:[],
            right:[]
        }

        Object.assign(attributes, component.attributes)
        getSlots(slots,component)
        let slotTemplate=getSlotsStringType(slots)

        let stringAttr = getStringTypeAttr(attributes)
        let template = `<PCLeftRight
            ${stringAttr}>
            ${slotTemplate}
        </PCLeftRight>`
        return { template,attributes,slots }
}
export default handle