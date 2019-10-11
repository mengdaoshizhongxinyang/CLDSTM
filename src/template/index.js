import Antd from "./antd";

const getStringTypeAttr = function(attributes) {
    // value为空的不添加到模板中
    let stringAttr = ''
    Object.keys(attributes).forEach(key => {
        let attrKey
        let arr = ['text', 'selection', 'icon','color'] //这些类型都不用加bind
        if (arr.includes(attributes[key].type) || attributes[key].notBind) {
            attrKey = key
        } else {
            attrKey = `:${key}`
        }
        let attr = attributes[key].value ? `${attrKey}="${attributes[key].value}"\n` : ''
        stringAttr += attr
    })
    return stringAttr
}


const getTemplate=function(info,_attr={},_slots={}){
    let component=Antd[info.name](_attr,_slots)
    return component
}
export { getStringTypeAttr,getTemplate }