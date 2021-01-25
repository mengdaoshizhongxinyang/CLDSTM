declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>;
  export default component
}
declare module "*.less" {
  const style: {[key: string]: string};
  export default style;
}

declare namespace configs {
  interface fileType {
    [key: string]: {
      type: string
      name: string
      icon: string
      position?: string
      children?: fileType
      [key: string]: any
    }
  }
  const init: () => void
  const getDesktopIcon: () => fileType
  const getActionsItem: () => Array<{ name: string, action: string }>
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