/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-07 17:06:54
 * @Description: 
 */
import { defineComponent, h } from "vue";
import { PropTypes } from "@/utils/proptypes";
import SettingBody from "../../SettingBody";
export default defineComponent({
    components:{
        SettingBody
    },
    props:{
        widen:PropTypes.bool(true)
    },
    setup(props){
        return ()=>h(
            <SettingBody widen={props.widen}>

            </SettingBody>
        )
    }
})