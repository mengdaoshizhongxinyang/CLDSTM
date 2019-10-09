<template>
  <a-select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    style="width: 200px"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
  >
    <a-select-opt-group v-for="(item,i) in list" :key="i" :label="item.title">
      <a-select-option v-for="(it,j) in item.icons" :value="it" :key="j">{{it}}<a-icon :type="it"></a-icon></a-select-option>
    </a-select-opt-group>
  </a-select>
</template>
<script>
import icon from "./icon.js";
export default {
  data() {
    return {
      list: icon
    };
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },

  }
};
</script>