let fs = require("fs")
let data = fs.readdirSync('./static')
let config = fs.readFileSync('./config.js').toString()
let articleList = "//article start//\n    var article={"
console.log(data)
function getFileTreeContent(res,now) {
    let ans=""
    if (res.split('.').length > 1) {
        let content = fs.readFileSync(`.${now}/${res}`).toString().split('\r\n').join('\\n')
        ans += `
        "${res}":{
            name:"${res}",
            type:"article",
            icon:"article",
            position:"${now}/${res}",
            bind:{
                type:"article",
                icon:"article",
                content:"${content}"
            }
        },`
        return ans;
    }else{
        let content = fs.readdirSync(`.${now}/${res}`)
        let children=""
        content.forEach(next=>{
            children+=getFileTreeContent(next,`${now}/${res}`)
        })
        ans += `
        "${res}":{
            name:"${res}",
            type:"folder",
            icon:"folder",
            bind:{
                position:"${now}/${res}",
                type:"folder",
                icon:"folder",
                children:{
                    ${children}
                }
            }
        },`
        return ans;
    }

}
articleList+=getFileTreeContent('static','')
articleList += "}\n"
articleList += "//article end//"
config = config.replace(/.*\/\/article start\/\/[\n|\r|\r\n](.*[\n|\r|\r\n])*.*\/\/article end\/\//, articleList)//\/\/article start\/\/\n.*\n\/\/article end\/\/
fs.writeFileSync('./config.js', config)