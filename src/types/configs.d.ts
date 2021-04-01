/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-03 11:42:57
 * @Description: 
 */
declare namespace configs {
  const init: () => void
  const getDesktopIcon: () => FileType.FilesType
  const getActionsItem: () => Array<{ name: string, action: string }>
  const password:()=>string
  export {
    init,
    getDesktopIcon,
    getActionsItem,
    password
  }
}