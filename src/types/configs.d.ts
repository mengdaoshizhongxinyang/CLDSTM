/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-03 11:42:57
 * @Description: 
 */
declare namespace configs {
  interface FileType {
    [key: string]: {
      type: string
      name: string
      icon: string
      position?: string
      children?: FileType
      [key: string]: any
    }
  }
  const init: () => void
  const getDesktopIcon: () => FileType
  const getActionsItem: () => Array<{ name: string, action: string }>
  export {
    init,
    getDesktopIcon,
    getActionsItem,
    FileType
  }
}