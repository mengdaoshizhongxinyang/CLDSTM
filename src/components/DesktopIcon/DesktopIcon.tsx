/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-07 22:12:42
 * @Description: 
 */
import { defineComponent, h, reactive } from "vue";
import { BaseDraggable } from "@/components";
import DesktopIconBase from "./DesktopIconBase";
import { PropTypes } from "@/utils/proptypes";
import { IconList } from "@/types";
import { IconInfo } from "./type";
export default defineComponent({
    components: {
        BaseDraggable,
        DesktopIconBase
    },
    props:{
        x:PropTypes.number(),
        y:PropTypes.number(),
        iconInfo:PropTypes.object<IconInfo>(),
        onOpenApps:PropTypes.func()
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
                x={props.x}
                y={props.y}
                v-model={[data.actived,'active']}
            >
                <DesktopIconBase iconInfo={props.iconInfo} onOpenApps={props.onOpenApps}></DesktopIconBase>
            </BaseDraggable>
        )
    }
})