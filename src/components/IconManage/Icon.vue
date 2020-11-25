<template>
  <component
    :is="`${iconList.antd[icon]}${type[iconStyle]}`"
    v-if="iconList.antd[icon]"
  />
  <component :is="iconList.more[icon]" v-else-if="iconList.more[icon]" />
  <file-unknown-outlined type="file-unknown" v-else />
</template>

<script>
import vscodeIcon from "./vscodeIcon";
import Icon, {
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
  FileMarkdownFilled
} from "@ant-design/icons-vue";
export default {
  components: {
    vscodeIcon,
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
    FileMarkdownFilled
  },
  props: {
    icon: {
      type: String,
      default: "file-unknown",
    },
    iconStyle: {
      type: String,
      default: "outlined",
    },
  },

  data() {
    return {
      type: {
        filled: "Filled",
        outlined: "Outlined",
        twoTone: "TwoTone",
      },
      iconList: {
        antd: {
          folder: "Folder",
          article: "FileMarkdown",
          setting: "Setting",
          redo: "Redo",
          minus: "Minus",
          block: "Block",
          border: "Border",
          close: "Close",
          arrowLeft:"ArrowLeft",
          arrowRight:"ArrowRight",
          down:"Down",
          up:"Up",
          arrowUp:"ArrowUp"
        },
        more: {
          vscode: "vscodeIcon",
        },
      },
    };
  },
  mounted(){
    if(!this.type[this.iconStyle]){
      console.log(this.iconStyle)
    }
  }
};
</script>