function Config() {
    var signboard = false
//article start//
    var article=[
        {
            name:"static",
            type:"folder",
            icon:"folder",
            bind:{
                children:[
                    
        {
            name:"d2.md",
            type:"article",
            icon:"file-markdown",
            bind:{
                content:"测试md\n===="
            }
        },
        {
            name:"test.md",
            type:"article",
            icon:"file-markdown",
            bind:{
                content:"源码结构\n==\n\n    ├─App.vue\n    ├─main.js\n    ├─utils\n    |   ├─guid.js                        //返回一个唯一标识符，组件被拖入后的id就是调用此方法获得\n    |   ├─leancloud storage.js           //分享功能，将Vuex数据保存到云端，使用leanCloud\n    |   └mergeDeep.js                    //深度合并对象的方法\n    ├─store\n    |   └index.js                        //Vuex\n    ├─router\n    |   └index.js                        //Vue-Router\n    ├─components\n    |     ├─attributes.vue               //左侧的属性视图组件\n    |     ├─colorList.js                 //颜色选择器中颜色的列表\n    |     ├─colorPicker.vue              //颜色选择器组件\n    |     ├─components.vue               //右侧的组件列表视图\n    |     ├─componentTree.vue            //左侧的组件树\n    |     ├─iconList.js                  //图标选择器中图标的列表\n    |     ├─iconPicker.vue               //图标选择器\n    |     ├─main.vue                     //主页面\n    |     ├─mount.js                     //封装的挂载方法\n    |     ├─preview.vue                  //预览视图的组件\n    |     ├─preview_mobile.vue           //手机预览的组件\n    |     ├─preview_product.vue          //体验拖拽完成的作品的页面\n    |     ├─subAttribute.vue             //属性视图的子属性组件\n    |     ├─template                     //UI组件的模板目录\n    |     |    ├─index.js                //提供了三个方法，主要使用getTemplate来实现拖入控件后，得到一个组件对象并保存到vuex\n    |     |    ├─README.md\n    |     |    ├─Muse-UI                 //UI分类目录\n    |     |    |    ├─App Bar.js         //UI组件之一\n    |     |    |    ├─  ………\n    |     |    |    ├─Time Picker.js\n    |     |    |    └Tr.js\n    |     |    ├─Mint-UI\n    |     |    |    ├─Button.js\n    |     |    |    ├─Header.js\n    |     |    |    └index.js\n    |     |    ├─Common\n    |     |    |   ├─A.js\n    |     |    |   ├─  ………\n    |     |    |   └Text.js\n    |     ├─list                         //右侧的组件列表视图中，所显示的组件的列表，由于有的行数太多，就提取了出来\n    |     |  ├─muse-ui\n    |     |  |    ├─appbar.vue\n    |     |  |    ├─  ………\n    |     |  |    └timePicker.vue\n    ├─assets                             //所需资源\n    |   ├─logo.png\n    |   ├─css\n    |   |  ├─global.css                  //全局样式\n    |   |  ├─theme-dark.css              //Muse-UI的自定义主题（红色风格）\n    |   |  ├─highlight                   //代码格式化后的高亮样式\n\n "
            }
        },
        {
            name:"分类测试",
            type:"folder",
            icon:"folder",
            bind:{
                children:[
                    
        {
            name:"新的md.md",
            type:"article",
            icon:"file-markdown",
            bind:{
                content:"新md\n===="
            }
        },
                ]
            }
        },
                ]
            }
        },]
//article end//
    var file = [
        // {
        //     name:"零用钱大作战",
        //     type:"Money",
        //     icon:"pay-circle"
        // }
    ]
    this.getFile = function () {
        console.log(file)
        return file
    }
    this.init = function () {
        file = file.concat(article)
    }
    //todo 临时拿个列表试试。。
    this.getDesktopIcon = function () {
        return file
    }
    this.init()

}
var configs = new Config()