let fs = require("fs")
let data = fs.readdirSync('./static')
let config=fs.readFileSync('./config.js').toString()
let articleList="//article start//\n    var article=[\n"

data.forEach(res=>{
    let content=fs.readFileSync(`./static/${res}`).toString().split('\r\n').join('\\n')
    articleList+=`
    {
        name:"${res}",
        type:"article",
        bind:{
            content:"${content}"
        }
    },`
})
articleList+="]\n"
articleList+="//article end//"
config=config.replace(/\/\/article start\/\/[\n|\r|\r\n](.*[\n|\r|\r\n])*\/\/article end\/\//,articleList)//\/\/article start\/\/\n.*\n\/\/article end\/\/
console.log(config)
console.log(data);
fs.writeFileSync('./config.js',config)