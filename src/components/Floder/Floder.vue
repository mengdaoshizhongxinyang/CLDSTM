<template>
  <Frame>
    <div class="floder">
      <div class="floder-menu"></div>
      <div class="floder-address"></div>
      <div class="floder-content">
        <div class="floder-content-tree"></div>
        <div class="floder-content-list"></div>
      </div>
    </div>
  </Frame>
</template>

<script>
import { Frame } from "@/components";
export default {
  components: {
    Frame,
  },
};
</script>

<style lang="less" scoped>
.floder {
  display: flex;
  flex-flow: column;
  height: 100%;
  &-menu {
    height: 30px;
  }
  &-address {
    height: 30px;
  }

  &-content {
    flex: 1;
    display: flex;
    &-tree {
      width: 160px;
    }
    &-list {
      flex: 1;
      min-width: 150px;
    }
  }
}
</style>
