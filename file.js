let fs=require('fs')
let file=fs.readFileSync('./abcdefg').toString();
let table=file.split('\r\n#');
// let obj={}
// table.forEach(t=>{
//     obj[t.split('\t')[1]]=1
// })
// console.log(obj)
table.forEach(tb=>{
    let t=tb.split('\r\n')
    let tname=t[0]
    let str=`CREATE TABLE \`${tname}\` (\r\n`
    
    console.log(tname)
    t.splice(0,1)
    let col=t.map(it=>{
        let item=it.split('\t')
        return `\`${item[0]}\` ${item[1]} ${item[1]=='varchar'?'COLLATE utf8mb4_unicode_ci ':''}${item[1]=='timestamp'?'NULL ':''}DEFAULT NULL COMMENT '${item[6]}'`
    })
    t.forEach(it=>{
        let item=it.split('\t')
        if(item[4]=='1'){
            col.push(`INDEX \`${item[0]}\`(\`${item[0]}\`) USING BTREE`)
        }
    })
    str+=col.join(',\r\n')+'\r\n) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\r\n'
    fs.writeFileSync(`${tname}.sql`,str)
})
//  fs.writeFileSync(`${table[1].split('\r\n')[0]}`)
// console.log(table[1].split('\r\n')[0])
// console.log(table[1].split('\r\n')[0].split('\t').length)
