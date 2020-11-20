<template>
  <icon :type="iconList.antd[icon]" v-bind="iconStyle" v-if="iconList.antd[icon]" />
  <component :is="iconList.more[icon]" v-bind="iconStyle" v-else-if="iconList.more[icon]" />
  <file-unknown-outlined type="file-unknown" v-bind="iconStyle" v-else />
</template>

<script>
import vscodeIcon from "./vscodeIcon";
import Icon,{FileUnknownOutlined} from '@ant-design/icons-vue';
export default {
  components: {
    vscodeIcon,
    FileUnknownOutlined,
    Icon
  },
  props: {
    icon: {
      type: String,
      default: "file-unknown",
    },
    iconStyle: {
      type: Object,
      default: () => {
        return { theme: "filled" };
      },
    },
  },

  data() {
    return {
      iconList: {
        antd: {
          folder: "folder",
          article: "file-markdown",
          setting:"setting"
        },
        more: {
          vscode: "vscodeIcon",
        },
      },
    };
  },
};
</script>