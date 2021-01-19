declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module "*.less" {
  const less: {[key:string]:string};
  export default less;
}

declare namespace configs{
  interface fileType{
    [key:string]:{
      type:string
      name:string
      icon:string
      position?:string
      children?:fileType
      [key:string]:any
    }
  }
  const init:()=>void
  const getDesktopIcon:()=>fileType
  const getActionsItem:()=>Array<{name:string,action:string}>
  export {
    init,
    getDesktopIcon,
    getActionsItem,
    fileType
  }
}

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $store: Store
//   }
// }