/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-04-21 17:42:13
 * @Description: 整一个队列，每次事件朝里面丢。。。30MS清一个，然后这个队列开放，所有需要的去观察，每次观察队首是不是自己要的，是的话就标记。。。
 */
// type HotKeyList='ctrl'|'shift'|'alt'|'ctrl+alt'|'ctrl+shift'|'shift+alt'
// type HotKey={[key in HotKeyList]:{[key in string]:(()=>void)[]}}
type KeydownMessage={event:KeyboardEvent,t:number,isHandle:boolean,type:'keyboard'}
type KeydownMessageList=KeydownMessage[]
declare namespace KeydownFactory {
  
}

class KeydownFactory{
  private messageList:KeydownMessageList=[]
  constructor(){
    document.body.addEventListener('keydown',(e)=>{
      this.messageList.push({event:e,t:+new Date(),isHandle:false,type:'keyboard'})
    })
    this.start()
  }
  private start(){
    this.recycle()
  }
  private recycle(){
    let now=+new Date()
    while(this.messageList.length>0 && (now-this.messageList[0].t>30)){
      this.messageList.shift();
    }
    setTimeout(()=>{this.recycle()}, 30);
  }
  getMessage(){
    if(this.messageList.length==0){
      return null
    }
    const message=this.messageList[0]
    if(!message.isHandle){
      return message
    }else{
      this.messageList.shift();
      return null
    }
  }
}

let keydownFactory=new KeydownFactory()
let getKeydown=()=>{
  return keydownFactory
}
export default getKeydown

