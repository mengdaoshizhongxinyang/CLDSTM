/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2020-12-28 11:33:23
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { Store } from '@/store'



const baseFileType= {
  'article': 'ArticleMd',
  'Money': 'Money',
  'folder': 'Folder',
  'vscode': 'vscode',
  'setting': 'setting'
}
type taskType = fileType & {
  mini: boolean
  id: number
  zindex: number
  apps: typeof baseFileType[keyof typeof baseFileType]
}
interface fileType {
  type: keyof typeof baseFileType
  name?: string
  icon?: string
  position?: string
  children?: filesType
  path?:string
  [key: string]: any
}
interface filesType {
  [key: string]: fileType
}
export {
  taskType,
  fileType,
  baseFileType,
  filesType
}