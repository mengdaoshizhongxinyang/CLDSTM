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
  SnippetsOutlined,
  HighlightOutlined,
  GlobalOutlined,
  FontColorsOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons-vue";
const components={
  ExclamationCircleOutlined,
  FontColorsOutlined,
  GlobalOutlined,
  HighlightOutlined,
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
  FileTextOutlined,
  vscodeIcon
}
import { defineComponent,h,PropType } from "vue";
export type IconList=keyof typeof components
export default defineComponent({
  components,
  props: {
    icon: {
      type: String as unknown as PropType<IconList>,
      default: "FileUnknown",
    }
  },
  setup(props) {
    return ()=>h(
      components[props.icon] || components['FileUnknownOutlined']
    )
  }
})