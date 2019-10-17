<template>
  <div id="mbl">
    <PCLeftRight>
      <template v-slot:left>
          <div><a-button icon="search" key="1"></a-button></div>
        
      </template>
      <template v-slot:right>
          <div><a-button type="primary" key="2"></a-button></div>
        
      </template>
    </PCLeftRight>
  </div>
</template>

<script>
import components from "@/components";
export default {
  components: components
};
</script>

<style lang="less" scoped>
</style>