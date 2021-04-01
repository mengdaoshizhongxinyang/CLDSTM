/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-04-01 13:48:45
 * @Description: 
 */

import { ReturnGetters, Store, ActionContext } from '@/types/store';
import md5 from "md5";
const SET_PASSWORD = 'SET_PASSWORD'
const state = {
  password:""
}
type State = typeof state

const mutations = {
  [SET_PASSWORD](state:State,password:string){
    let enterPassword=md5(password).toUpperCase()
    let left="",right=""
    enterPassword.split('').forEach((value,index)=>{
      if(index%2==0){
        left+=value
      }else{
        right+=value
      }
    })
    if(enterPassword==configs.password()){
      state.password=password
      return true
    }else{
      return false
    }
  }
}
type Actions = ActionContext<State, Getters>
const actions = {
  enterPassword({commit}:Actions,password:string){
    return commit(SET_PASSWORD,password)
  }
}

const getters = {
  getHandlePassword(){
    let left="",right=""
    md5(state.password).split('').forEach((value,index)=>{
      if(index%2==0){
        left+=value
      }else{
        right+=value
      }
    })
    return left+right
  }
}
type Getters = ReturnGetters<typeof getters>;

const vuexModule = {
  state,
  mutations,
  actions,
  getters
}

export default vuexModule