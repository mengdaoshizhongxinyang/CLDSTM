/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2020-11-20 17:13:50
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
export interface storage{
  length:Number,
  clear:(string)=>void,
  getItem:(string)=>string,
  removeItem:(string)=>void,
  setItem:(string,string)=>void
  key:(Number)=>string
}