/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2020-12-28 11:33:23
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { Store } from '@/store'
import { IconList as Icons } from "@/components/IconManage";

type IconList=Icons

const baseFileType= {
  'article': 'ArticleMd',
  'Money': 'Money',
  'folder': 'Folder',
  'vscode': 'vscode',
  'setting': 'setting'
}
type TaskType = FileType & {
  mini: boolean
  id: number
  zindex: number
  apps: typeof baseFileType[keyof typeof baseFileType]
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
interface FilesType {
  [key: string]: FileType
}
export {
  TaskType,
  FileType,
  baseFileType,
  FilesType,
  IconList
}
