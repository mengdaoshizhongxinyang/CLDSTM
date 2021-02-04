/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-03 11:43:12
 * @Description: 所有运行的task
 */
import { baseFileType } from "./baseData";
import { IconList } from "@/components/IconManage/Icon";
/**
 * 
 */
declare interface Task{
  id:number
  apps:FileType
}
declare interface App{
  type:keyof typeof baseFileType
  name:string
}
declare interface AppTask extends Task{
  mini: boolean
  zindex: number
  apps: {[key:string]:unknown}
}

declare interface FileType extends App{
  icon?: string
  position?: string
  children?: FilesType
  path?:string
  [key: string]: any
}
interface FilesType {
  [key: string]: FileType
}
