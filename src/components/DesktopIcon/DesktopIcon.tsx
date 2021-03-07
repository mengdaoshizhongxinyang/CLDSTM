/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-07 22:12:42
 * @Description: 
 */
import { defineComponent, h, reactive } from "vue";
import { BaseDraggable } from "@/components";
import DesktopIconBase from "./DesktopIconBase";
export default defineComponent({
    components: {
        BaseDraggable,
        DesktopIconBase
    },
    setup(props, { attrs }) {
        const data = reactive({
            actived: false
        })
        return () => h(
            <BaseDraggable
                resizable={false}
                w={76}
                h={88}
                parent={true}
                v-model={[data.actived,'active']}
            >
                <DesktopIconBase {...attrs}></DesktopIconBase>
            </BaseDraggable>
        )
    }
})