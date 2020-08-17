import getTransitionProps from "ant-design-vue/es/_util/getRequestAnimationFrame";
import { filterEmpty } from "ant-design-vue/es/_util/props-util";
const props = {
    level: 1,
    content: {}
}
const TreeItem = {
    name: "TreeItem",
    props,
    methods: {
        renderChildren(children) {
            const subMenu = {
                props: {
                    level: props.level,
                }
            }

            return (
                <transition {...transitionProps}>
                    <TreeItem {...subMenu} />
                </transition>
            );
        },
    },
    render() {
        const props = { ...this.$props };
        const style = {}
        style.paddingLeft = `${props.level * 16}px`
        const children = this.renderChildren(filterEmpty(this.$slots.default));
        return (
            <div style={style}>
                {this.$slots.default}
                {this.renderChildren()}
            </div>
        )
    }
}
export default TreeItem