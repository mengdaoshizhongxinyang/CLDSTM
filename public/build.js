let fs = require("fs")
let data = fs.readdirSync('./static')
let config = fs.readFileSync('./config.js').toString()
let articleList = "//article start//\n    var article={"
console.log(data)
function getFileTreeContent(res,now) {
    let ans=""
    if (res.split('.').length > 1) {
        let content = fs.readFileSync(`.${now}/${res}`).toString().split('\r\n').join('\\n').replace(/\\\/\\\//g,'\/\/').replace(/\"/g,'\\\"')
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
            position:"${now}",
            content:"${content}",
            description:"${desc[0]}",
            size:"${stat.size}",
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
            position:"${now}",
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


function Compress(strNormalString) {
        let strCompressedString = "";
    
        let ht = new Array();
        for(i = 0; i < 128; i++) {
            ht[i] = i;
        }
    
        let used = 128;
        let intLeftOver = 0;
        let intOutputCode = 0;
        let pcode = 0;
        let ccode = 0;
        let k = 0;
    
        for(let i=0; i<strNormalString.length; i++) {
            ccode = strNormalString.charCodeAt(i);
            k = (pcode << 8) | ccode;
            if(ht[k] != null) {
                pcode = ht[k];
            } else {
                intLeftOver += 12;
                intOutputCode <<= 12;
                intOutputCode |= pcode;
                pcode = ccode;
                if(intLeftOver >= 16) {
                    strCompressedString += String.fromCharCode( intOutputCode >> ( intLeftOver - 16 ) );
                    intOutputCode &= (Math.pow(2, (intLeftOver - 16)) - 1);
                    intLeftOver -= 16;
                }
                if(used < 4096) {
                    used ++;
                    ht[k] = used - 1;
                }
            }
        }
    
        if(pcode != 0) {
            intLeftOver += 12;
            intOutputCode <<= 12;
            intOutputCode |= pcode;
        }
    
        if(intLeftOver >= 16) {
            strCompressedString += String.fromCharCode( intOutputCode >> ( intLeftOver - 16 ) );
            intOutputCode &= (Math.pow(2,(intLeftOver - 16)) - 1);
            intLeftOver -= 16;
        }
    
        if( intLeftOver > 0) {
            intOutputCode <<= (16 - intLeftOver);
            strCompressedString += String.fromCharCode( intOutputCode );
        }
    
        return strCompressedString;
    }
    function Decompress(strCompressedString) {
        let strNormalString = "";
        let ht = new Array();
    
        for(i = 0; i < 128; i++) {
            ht[i] = String.fromCharCode(i);
        }
    
        let used = 128;
        let intLeftOver = 0;
        let intOutputCode = 0;
        let ccode = 0;
        let pcode = 0;
        let key = 0;
    
        for(let i=0; i<strCompressedString.length; i++) {
            intLeftOver += 16;
            intOutputCode <<= 16;
            intOutputCode |= strCompressedString.charCodeAt(i);
    
            while(1) {
                if(intLeftOver >= 12) {
                    ccode = intOutputCode >> (intLeftOver - 12);
                    if( typeof( key = ht[ccode] ) != "undefined" ) {
                         strNormalString += key;
                        if(used > 128) {
                            ht[ht.length] = ht[pcode] + key.substr(0, 1);
                        }
                         pcode = ccode;
                    } else {
                        key = ht[pcode] + ht[pcode].substr(0, 1);
                        strNormalString += key;
                        ht[ht.length] = ht[pcode] + key.substr(0, 1);
                        pcode = ht.length - 1;
                    }
    
                    used ++;
                    intLeftOver -= 12;
                    intOutputCode &= (Math.pow(2,intLeftOver) - 1);
                } else {
                    break;
                }
            }
        }
        return strNormalString;
    }