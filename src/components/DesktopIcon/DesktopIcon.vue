<template>
  <base-draggable
    :resizable="false"
    :w="76"
    :h="88"
    :parent="true"
    :active.sync="actived"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <desktop-icon-base v-bind="$attrs" v-on="$listeners">
        <template>
            <slot></slot>
        </template>
    </desktop-icon-base>
  </base-draggable>
</template>

<script>
import BaseDraggable from "@/components/BaseDraggable";
import DesktopIconBase from "./DesktopIconBase.vue";
export default {
  components: {
    BaseDraggable,
    DesktopIconBase
  },
  data() {
    return {
      actived: false,
    };
  }
};
</script>

<style lang="less" scoped>
</style>