function Config() {
    var signboard = false
//article start//
    var article={
        "static":{
            name:"static",
            type:"folder",
            icon:"FolderOutlined",
            position:"",
            children:{
                
        "project":{
            name:"project",
            type:"folder",
            icon:"FolderOutlined",
            position:"/static",
            children:{
                
        "前端的中文转拼音实现.md":{
            name:"前端的中文转拼音实现.md",
            type:"article",
            icon:"article",
            position:"/static/project",
            content:"前端实现简易的汉字转拼音\n====\n对方需要在搜索历史记录的时候，增加对拼音的支持，但是该项目做到这里，我发现我们没有后端了，没有后端了，后端了。。。迫不得已，我们只能想办法在前端实现。然而，搜索引擎上搜到的解决方案，都带了庞大的字典，动辄几MB，想要在政府单位那些老爷机上展示，还是需要勇气的。\n\n\n\n\n\n[故事的转机来自安卓系统的源码](https://android.googlesource.com/platform/packages/providers/ContactsProvider/+/0c49720fb3d58e346739c2ccd56ed2b739249e07/src/com/android/providers/contacts/HanziToPinyin.java)\n----\n从头到尾不过几百行代码，如果去除了边界判断的数组，不过200+行？？？仿佛不是没有转js的可能。\n\n### Android的实现转js ###\n都什么年代了，不会还有人没在js试过对汉字比较大小吧？，假如试过你就会发现，他们的比较是按照拼音来的。那么，我们只需要有一张小小的字典，记录每一种拼音的第一个汉字，比起汉字，拼音的数量总归小很多吧。（感谢底层的大佬们对汉字的排序是和拼音相关的）\n\n### 有了大概的概念，接下来就是要实现的大体目标 ###\n\n1.汉字的边界表，虽然从android源码cv过来2个大大的数组，但是在有不小的错误率，这个只能一个个的区手动修正，幸好需要支持的字不多，修正很快，也就all day   \n2.其次是查找，就是和边界表的汉字进行比较，一个二分下去，当场梭哈。\n\n故事的继续\n----\n实现完了，对方也挺满意了，结果演示当天，对方输入了个‘曾’,这个地方是搜人的，如果曾放在开头有时代表姓氏，有时代表名字的模糊搜索，我？？？？？\n\n作为一个程序员，我的搜索引擎页面，挂着百家姓的搜索结果，里面还有不少字要靠着搜狗的u才打得出。ls的存储记录，从普通的字符串变身正则字符串。。。。\n\n最后，纪念那转了后端差点die于局子的前端[滑稽]",
            description:"对方需要在搜索历史记录的时候，增加对拼音的支持，但是该项目做到这里，我发现我们没有后端了，没有后端了，后端了。。。迫不得已，我们只能想办法在前端实现。然而，搜索引擎上搜到的解决方案，都带了庞大的字典，动辄几MB，想要在政府单位那些老爷机上展示，还是需要勇气的。\n\n\n",
            size:"2116",
            mtime:"Tue Sep 08 2020 14:18:46 GMT+0800 (GMT+08:00)",
            ctime:"Tue Sep 08 2020 14:18:46 GMT+0800 (GMT+08:00)"
        },
        "巨坑的图片裁剪.md":{
            name:"巨坑的图片裁剪.md",
            type:"article",
            icon:"article",
            position:"/static/project",
            content:"天坑的图片裁剪\n====\n\"我们需要以图搜结果，你在输入框里放个图片搜索，图片要能裁剪。。。。\"对方又提需求了，不过这次这个看起来很难，实际不难？！\n\n\n\n被坑的第一次记录\n----\n听到这个需求，第一想法，别人也有类似的需求吧，应该有类似的库，开开心心的add，一波操作，一上午，提交。\"这么快就做完了？我看看\"\nfew minute later，\"你这做的什么啊，一开始就默认出来，你出来在人脸上也好，前端实现不了在人脸上，你就不能像别的裁剪工具一样，手动拖一个框来?...\"\n\n第一次探索记录\n----\n被撵回来后，陷入沉思，前端有没有像素的操作呢？仔细一想，canvas不就有像素的操作？一波操作，200行代码下去，图片加载完，往canvas上一抹，来了来了。在然后，做了一个框，框的8个方位个放了一个小小的正方形，单机拖动改变框的小，记录左上角相对位置和宽高，dblclick，从canvas固定的位置拿下像素。\n``` js\nlet cvs = this.$refs.canvas\nlet draw = this.$refs.canvasDraw\nlet drawCtx = draw.getContext('2d')\nlet ctx = cvs.getContext('2d')\nlet img = this.$refs.img\n\nconst { x, y, w, h } = this//x,y相对位置，w,h宽高\nctx.drawImage(img, 0, 0, img.width, img.height);\ndraw.width = Math.abs(w)\ndraw.height = Math.abs(h)\nlet ImageData = ctx.getImageData(x, y, Math.abs(w), Math.abs(h));\ndrawCtx.putImageData(ImageData, 0, 0)\nlet base64 = draw.toDataURL()\nthis.isStartCut = false\nthis.showCutFrame = false\nthis.src = base64\nthis.$emit('cutImg', this.src)\n```\n接着是糊一个半透明的黑色覆盖物，裁剪框的中间是全透明的。\n一开始的方案是，每次x,y,h,w改变的操作，都获取一次裁剪，并把结果放到框内\n```html\n<drag>\n  <canvas></canvas>\n</drag>\n```\n不过性能极差，比PPT还不如，接着就想到了，对可移动的框做操作，用计算，背景是图片，透过overflow部分是可见，剩下不可见的由底层展示\n```html\n<div>\n  <drag\n    :x=\"x\"\n    :y=\"y\"\n    :w=\"Math.abs(w)\"\n    :h=\"Math.abs(h)\"\n    @resizing=\"(x,y,w,h)=>handleResizestop(x,y,w,h)\"\n    @dragging=\"(x,y)=>handleDragstop(x,y)\"\n    style=\"position:relative\"\n  >\n    <div @dblclick=\"cutImg\">\n      <img\n        :src=\"src\"\n        alt\n        :style=\"`position:absolute;left:${-x-2}px;top:${-y-2}px;width:${width}px;height:${height}px`\"\n      />\n    </div>\n  </drag>\n</div>\n```\n\n被坑的第二次记录\n--\n这个夏天的天气真好，七月中旬了，接头散步感受不到丝丝热意，风伴着晚霞，拂去工作一天的压力。\n\n第二稿发布了，测试死于一张4k宽的超高清照片，图片一经展出，不仅上下滚，还左右滚。。。\n\n第二次埋坑记录\n---\n幸好组件是自己写的，各种问题解决的时候，代码都看得懂。\n\n首先是宽高问题，最后决定是增加放大缩小功能。在组件初始化结束，获取图片信息并把高宽等比缩放\n\n拿到图片信息，初始化时获得基础高宽缩放后的大小作为展示大小\n``` js\nlet img = new Image();\nimg.src = this.src\nimg.onload = () => {\n  this.baseWidth = img.width\n  this.baseHeight = img.height\n  if (this.baseWidth > this.maxWidth || this.baseHeight > this.maxHeight) {\n    this.proportion = Math.floor(Math.min(this.maxWidth / this.baseWidth, this.maxHeight / this.baseHeight) * 100) / 100\n    this.width = this.baseWidth * this.proportion\n    this.height = this.baseHeight * this.proportion\n  } else {\n    this.width = this.baseWidth\n    this.height = this.baseHeight\n    this.proportion = 1\n  }\n  this.$emit('success', this.width)\n}\n....//缩放操作\nzoom(e) {\n  this.proportion = Math.floor(e * 100) / 100\n  this.width = this.baseWidth * this.proportion\n  this.height = this.baseHeight * this.proportion\n}\n```\n被坑的第三次记录\n----\n第三次主要是一些额外信息的操作，比如加入了选择框可选择数据来源，加入数字输入框修改阈值等基础操作。同时，不仅要支持图片上传，还要excel上传。最后决定，这个组件的数据全放状态管理里操作。\n\n可算应付完那些个有钱的老人家了。",
            description:"\"我们需要以图搜结果，你在输入框里放个图片搜索，图片要能裁剪。。。。\"对方又提需求了，不过这次这个看起来很难，实际不难？！\n",
            size:"4307",
            mtime:"Tue Sep 08 2020 15:37:58 GMT+0800 (GMT+08:00)",
            ctime:"Tue Sep 08 2020 15:37:58 GMT+0800 (GMT+08:00)"
        },
            }

        },
        "分类测试":{
            name:"分类测试",
            type:"folder",
            icon:"FolderOutlined",
            position:"/static",
            children:{
                
        "新的md.md":{
            name:"新的md.md",
            type:"article",
            icon:"article",
            position:"/static/分类测试",
            content:"新md\n====",
            description:"",
            size:"11",
            mtime:"Fri Aug 07 2020 17:07:09 GMT+0800 (GMT+08:00)",
            ctime:"Fri Aug 07 2020 17:07:09 GMT+0800 (GMT+08:00)"
        },
            }

        },
            }

        },}
//article end//

        //文件总和
    var file = {
        vscode:{
            name:"vscode",
            type:"vscode",
            icon:"vscodeIcon",
        },
        SimpleNote:{
            name:"Note",
            type:"SimpleNote",
            icon:"FileTextOutlined",
        },
    }
    this.getFile = function () {
        return file
    }
    this.init = function () {
        Object.assign(file,article)
    }
    //todo 临时拿个列表试试。。
    this.getDesktopIcon = function () {
        return file
    }
    this.actions={
        test(Obj,data){
            console.log(Obj)
        }
    }
    var actionsItem={
        base:[{name:"测试",action:"test"}]
    }
    this.init()

    this.getActionsItem=function(){
        return actionsItem
    }

    this.password=function(){
        //20ACE99C4630A27A990FA60F410DD0EA
        return "32C98905554EA76FE74442DDC1909EDD"
    }
}
var configs = new Config()
