declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>;
  export default component
}
declare module "*.less" {
  const style: {[key: string]: string};
  export default style;
}



// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $store: Store
//   }
// }