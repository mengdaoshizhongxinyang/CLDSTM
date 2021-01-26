/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-26 16:42:58
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import vscodeIcon from "./vscodeIcon.vue";
import {
  FileUnknownOutlined,
  FolderOutlined,
  FolderFilled,
  PlusOutlined,
  RedoOutlined,
  BorderOutlined,
  MinusOutlined,
  BlockOutlined,
  CloseOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  DownOutlined,
  UpOutlined,
  FileMarkdownOutlined,
  FileMarkdownFilled,
  SnippetsOutlined
} from "@ant-design/icons-vue";
const components={
  FileUnknownOutlined,
  FolderOutlined,
  FolderFilled,
  PlusOutlined,
  RedoOutlined,
  BorderOutlined,
  MinusOutlined,
  BlockOutlined,
  CloseOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  DownOutlined,
  UpOutlined,
  FileMarkdownOutlined,
  FileMarkdownFilled,
  SnippetsOutlined,
  vscodeIcon
}
import { defineComponent,h,reactive,PropType } from "vue";
export default defineComponent({
  components,
  props: {
    icon: {
      type: String as PropType<keyof typeof components>,
      default: "FileUnknown",
    },
    iconStyle: {
      type: String as PropType<'filled' | 'outlined' | 'twoTone'>,
      default: "outlined",
    },
  },
  setup(props) {
    console.log(props.icon)
    return ()=>h(
      components[props.icon]
    )
  }
})