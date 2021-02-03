/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-03 11:43:12
 * @Description: 所有运行的task
 */
import { baseFileType } from "./index";
import {  } from "@/components/IconManage/Icon";
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
  icon?:string
}
interface FileType {
  type: keyof typeof baseFileType
  name?: string
  icon?: string
  position?: string
  children?: FilesType
  path?:string
  [key: string]: any
}