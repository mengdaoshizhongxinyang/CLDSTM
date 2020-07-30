vue状态管理。。。
====
```
|-modules
 |-core //启动项目前需要获得的数据，比如权限，路由等
 |-services //api的管理
 |-view //组件自身需要保存数据时
 |-。。。可以根据情况自行增删
```

api管理template
----
初始化
```
//初始化一个动作名，用来管理state的内容
export const MUTATIONS_KEY1 = 'MUTATIONS_KEY1'
//比如存一个货物列表  goods.js
export const SET_GOODS = 'SET_GOODS'
const state = {
    goods:[]
}
const mutations={
    [SET_GOODS]( state , goods : Array ){
        state.goods = goods
    }
}
const actions = {
  async action1({ commit }) {
      let goods=.......
    commit(SET_GOODS, { goods })
  }
}
```
对请求的管理
```
//关于和后端对接大概模板,以货物为例
import { getGoods } from "@/api/goods/"
...
...
...
const actions = {
  async fetchGoods({ commit }, { data }) {
    try{
      let result = await getGoods(data)
      //这里也可以做到统一管理，就是灵活性会降低
      if(result.errCode==0){
        message.success(result.message)
        commit(SET_GOODS, result.data)
        //如果单页面需要单独处理，也可以直接返回
        //return result
      }else{
        throw result
      }
    }catch(e){
      message.error(e || e.message)
    }
  },
}
```
页面部分发送请求以及获取数据
```
//先初始化一个getter  goods.js:
const getters = {
  getGoods(state){
    return state.goods
    //如果有控制或什么统一需求,可以在返回的时候直接控制
    return state.goods.filter(item=>{
        return 。。。。。
    })
  }
}

//实际逻辑页面
import { mapState, mapActions, mapGetters } from 'vuex';
export default{
  computed:{
    ...mapGetters(['getGoods1'])//通过getter拿到
    //也可以在状态里拿到，建议第一种方式为主
    ...mapState({
      getGoods2(state){
        return state.services.goods.goods
      }
    })
  },
  async created(){
    //如果不需要保存在这里，可以不用let result=部分，state也能拿到
    //vuex更新会触发页面更新，原理同data里的更新
    let result=await this.$store.dispatch('fetchGoods')
  }
  render(){
    const list=this.getGoods1.map(item=>{
      return (<good-list>{ item.name }</good-list>)
    })
    return (
      <menu>{ list }</menu>
    )
  }
}
```
这里面还有需要一些节约性能的写法，这个放在状态管理里就非常合适

比较常见的就是更新操作，比如货物单位，获取货物单位列表的时候可以多传一个参数true或false，true的情况下强制发送请求，false的时候先看本地state里列表长度是否为0

还有就是update数据，尤其是不翻页的数据，前端拿到错误码为0，就可以手动更新不用管后端
```
//更新
[SET_UPDATE_GOODS]( state , goods : Object ){
    state.goods = [].concat(state.goods.map(item=>{
        return item.id==goods.id?goods:item
    }))
}
//获得详细
[SET_INFO_GOODS]( state , goods : Object ){
    state.goods = [].concat(state.goods.map(item=>{
        return item.id==goods.id?goods:item
    }))
}
```
