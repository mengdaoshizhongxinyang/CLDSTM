let fs = require("fs")
let data = fs.readdirSync('./static')
let config = fs.readFileSync('./config.js').toString()
let articleList = "//article start//\n    var article={"
console.log(data)
function getFileTreeContent(res,now) {
    let ans=""
    if (res.split('.').length > 1) {
        let content = fs.readFileSync(`.${now}/${res}`).toString().split('\r\n').join('\\n')
        let stat=fs.statSync(`.${now}/${res}`)
        let desc=content.match(/(?<===\\n)(.*)?(?=\\n\\n\\n)/)
        if(desc==null){
            desc=[""]
        }
        ans += `
        "${res}":{
            name:"${res}",
            type:"article",
            icon:"article",
            position:"${now}/${res}",
            content:"${content}",
            description:"${desc[0]}",
            size:"${stat.size}",
            atime:"${stat.atime}",
            mtime:"${stat.mtime}",
            ctime:"${stat.ctime}"
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

            position:"${now}/${res}",

            children:{
                ${children}
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