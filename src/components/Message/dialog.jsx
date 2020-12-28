import Vue from "vue";
// import ContainerRender from './ContainerRender';
// let openCount = 0;
// const DialogWrap = {
//   inheritAttrs: false,
//   props: {
//     visible: Boolean,
//   },
//   data() {
//     console.log(this.visible)
//     openCount = this.visible ? openCount + 1 : openCount;
//     this.renderComponent = () => {};
//     this.removeContainer = () => {};
//     return {};
//   },
//   watch: {
//     visible(val, preVal) {
//       openCount = val && !preVal ? openCount + 1 : openCount - 1;
//     },
//   },
//   beforeDestroy() {
//     if (this.visible) {
//       openCount = openCount ? openCount - 1 : openCount;
//       this.renderComponent({
//         afterClose: this.removeContainer,
//         visible: false,
//         on: {
//           close() {},
//         },
//       });
//     } else { 
//       this.removeContainer();
//     }
//   },
//   methods: {
//     getComponent(extra = {}) {
//       console.log(222)
//       const {  $props, $slots, getContainer } = this;
//       const { on, ...otherProps } = extra;
//       return <div class={`test`}>{$slots.default}</div>;
//     },

//     getContainer2() {
//       const container = document.createElement('div');
//       if (this.getContainer) {
//         this.getContainer().appendChild(container);
//       } else {
//         document.body.appendChild(container);
//       }
//       return container;
//     },
//   },

//   render() {
//     const { visible } = this;
//     return (
//       <ContainerRender
//         parent={this}
//         visible={visible}
//         autoDestroy={false}
//         getComponent={this.getComponent}
//         getContainer={this.getContainer2}
//         children={({ renderComponent, removeContainer }) => {
//           this.renderComponent = renderComponent;
//           this.removeContainer = removeContainer;
//           return null;
//         }}
//       />
//     );
//   },
// };

// export default DialogWrap;
export default {
  methods:{
    getContainer2() {
      const container = document.createElement('div');
      if (this.getContainer) {
        this.getContainer().appendChild(container);
      } else {
        document.body.appendChild(container);
      }
      return container;
    },
  },
  render() {
    let el = document.createElement('div');
    let self=this
    return new this.$root.constructor(new Vue({
      el,
      parent: self,
      render() {
        return <div></div>
      },
    }));
  }
}