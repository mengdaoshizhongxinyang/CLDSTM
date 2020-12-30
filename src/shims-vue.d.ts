declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module "*.less" {
  const less: any;
  export default less;
}

declare namespace configs{
  const fileType:{
    [key:string]:{
      type:string
      name:string
      icon:string
      position?:string
      children?:fileTypes
      [key:string]:any
    }
  }
  const init:()=>void
  const getDesktopIcon:()=>fileType
  const getActionsItem:()=>Array<{name:string,action:string}>
  export {
    init,
    getDesktopIcon,
    getActionsItem
  }
}