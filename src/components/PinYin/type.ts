/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-11 09:33:39
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
export interface DICT{
  EXCEPTIONS?:{
    [key :string]:string
  }
  UNIHANS:Array<string>
}
export interface token{
  source:string
  type?:1|2|3
  target?:string
}