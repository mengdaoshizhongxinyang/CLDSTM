export default {
    signboard: false,
    file: [{//支持md，html
        type: "md",
        name: "test"
    }, {
        type: "file",
        name: "d",
        children:[{
            type: "html",
            name: "d2"
        }]
    }]
}