/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-15 13:43:23
 * @Description: 
 */
declare type BaseFileType={
  "Money":string
  "vscode":string
  "setting":string
  "SimpleNote":string
  "article":string
  "folder":string
  "attribute":string
}
declare type BaseFileTypesNames=keyof BaseFileType
declare interface FileType {
  type: BaseFileTypesNames
  name: string
  icon: string
  position?: string
  path?:string
  children?: FilesType
  [key: string]: any
}
declare interface FilesType {
  [key: string]: FileType
}