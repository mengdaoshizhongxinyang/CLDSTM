/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2020-11-24 17:12:14
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
export interface WS{
  get:<T=any>(name:string,def?:any)=> T | null,
  set:(name:string,value:any,expire?:Date)=> void,
  setOptions:(any)=>void,
  key:(key:string)=>any,
  remove:(name:string)=>Boolean,
  clear:()=>void,
  on:(name:string,callback:Function)=>void,
  off:(name:string,callback:Function)=>void
}