<template>
  <div class="language-main">
    <div class="language-content">
      <a-select style="width: 100%" @select="handleSelect" :value="languageSelected">
        <a-select-option
          :value="languageOption.key"
          v-for="languageOption in languageList"
          :key="languageOption.key"
        >
          {{ languageOption.value }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      languageList(state) {
        return state.core.language.languageOptions;
      },
      languageSelected(state){
        return state.core.language.languageSelected;
      }
    }),
  },
  data() {
    return {};
  },
  methods:{
    handleSelect(item){
      this.$tstore.dispatch("setLanguage",item)
    }
  }
};
</script>

<style lang="less" scoped>
@name:~"language";
.@{name}-main{
  height:100%;
  background: #fff;
  padding: 96px 14px 14px 14px;
  display: flex;
  .@{name}-content{
    max-width: 272px;
    width: 100%;
  }
}
</style>