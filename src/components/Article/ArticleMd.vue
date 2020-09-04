<template>
  <Frame v-on="$listeners" v-bind="$attrs" :initialH="600" :initialW="1000">
    <article-base :content="content"></article-base>
  </Frame>
</template>

<script>
import ArticleBase from "./ArticleBase.vue";
import Frame from "@/components/Frame";
export default {
  components: {
    ArticleBase,
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