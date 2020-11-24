<template>
  <component :is="`${iconList.antd[icon]}${type[iconStyle]}`" v-if="iconList.antd[icon]" />
  <component :is="iconList.more[icon]" v-else-if="iconList.more[icon]" />
  <file-unknown-outlined type="file-unknown" v-else />
</template>

<script>
import vscodeIcon from "./vscodeIcon";
import Icon,{
  FileUnknownOutlined,
  FolderOutlined,
  FolderFilled,
  PlusOutlined,
  RedoOutlined,
  BorderOutlined,
  MinusOutlined,
  BlockOutlined,
  CloseOutlined
} from '@ant-design/icons-vue';
export default {
  components: {
    FileUnknownOutlined,
    FolderOutlined,
    FolderFilled,
    PlusOutlined,
    RedoOutlined,
    BorderOutlined,
    MinusOutlined,
    BlockOutlined,
    CloseOutlined,
    Icon
  },
  props: {
    icon: {
      type: String,
      default: "file-unknown",
    },
    iconStyle: {
      type: String,
      default:"outlined"
    },
  },

  data() {
    return {
      type:{
        filled:"Filled",
        outlined:"Outlined",
        twoTone:"TwoTone"
      },
      iconList: {
        antd: {
          folder: "Folder",
          article: "FileMarkdown",
          setting:"Setting",
          redo:"Redo",
          minus:"Minus",
          block:"Block",
          border:"Border",
          close:"Close"
        },
        more: {
          vscode: "vscodeIcon",
        },
      },
    };
  }
};
</script>