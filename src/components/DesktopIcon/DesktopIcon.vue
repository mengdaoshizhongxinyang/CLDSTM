<template>
  <BaseDraggable
    :resizable="false"
    :w="76"
    :h="88"
    :parent="true"
    :active.sync="actived"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <desktop-icon-base :name="name" :icon="icon" v-on="$listeners">
        <template>
            <slot></slot>
        </template>
    </desktop-icon-base>
  </BaseDraggable>
</template>

<script>
import BaseDraggable from "@/components/BaseDraggable";
import DesktopIconBase from "./DesktopIconBase.vue";
export default {
  components: {
    BaseDraggable,
    DesktopIconBase
  },
  props: {
    icon: {
      type: String,
      default: "file-unknown",
    },
    name:{
      type:String,
      default:""
    }
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