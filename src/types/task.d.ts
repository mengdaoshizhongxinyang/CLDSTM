/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-03 11:43:12
 * @Description: 所有运行的task
 */

declare interface AppStart{
  name:string
  type:BaseFileTypesNames
  contents?:{
    [key:string]:any
  }
  icon?:IconList
}
declare interface Task{
  id:number
  apps:FileType
}
declare interface AppTask extends Task{
  mini: boolean
  zindex: number
  apps: string
  name:string,
  contents?:{
    [key:string]:any
  }
  icon?:IconList
}



