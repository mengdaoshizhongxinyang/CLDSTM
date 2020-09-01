<template>
  <a-icon :type="iconList.antd[icon]" v-bind="iconStyle" v-if="iconList.antd[icon]" />
  <component :is="iconList.more[icon]" v-bind="iconStyle" v-else-if="iconList.more[icon]" />
  <a-icon type="file-unknown" v-bind="iconStyle" v-else />
</template>

<script>
import vscodeIcon from "./vscodeIcon";
export default {
  components: {
    vscodeIcon,
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
        },
        more: {
          vscode: "vscodeIcon",
        },
      },
    };
  },
};
</script>