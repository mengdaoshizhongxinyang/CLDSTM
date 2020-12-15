<template>
  <div class="markdown-body">
    <vue-md :source="content" class="markdown-content"></vue-md>
  </div>
</template>

<script>
import VueMd from "vue-markdown";
import Frame from "@/components/Frame";
export default {
  components: {
    VueMd,
    Frame,
  },
  props: {
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less" scoped>

</style>
<style lang="less">

</style>