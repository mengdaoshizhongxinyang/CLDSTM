<template>
  <div style="display:flex">
    <Vleft></Vleft>
    <Vright></Vright>
  </div>
</template>

<script>
import Vleft from "./test1.vue";
import Vright from "./test2.vue";
import components from "@/components";
export default {
  components: components
}
</script>

<style lang="less" scoped>
</style>