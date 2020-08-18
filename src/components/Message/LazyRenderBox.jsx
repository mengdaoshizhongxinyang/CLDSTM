
const ILazyRenderBoxPropTypes = {
  visible: Boolean
};

export default {
  props: ILazyRenderBoxPropTypes,
  render() {
    return <div>{this.$slots.default}</div>;
  },
};
