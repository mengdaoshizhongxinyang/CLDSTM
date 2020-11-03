<template>
  <setting-body v-bind="$attr">
    <div class="language-main">
      <div class="language-left" v-if="widen"></div>
      <div class="language-right">
        <info-title></info-title>
        <div class="language-content">
          <a-select
            style="width: 100%"
            @select="handleSelect"
            :value="languageSelected.abbreviation"
          >
            <a-select-option
              :value="languageOption.abbreviation"
              v-for="languageOption in languageList"
              :key="languageOption.abbreviation"
            >
              {{ languageOption.name }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <template #title>
      <div :class="`title ${widen ? 'widen-title' : ''}`">
        <div class="title-name">语言设置</div>
      </div>
    </template>
  </setting-body>
</template>

<script>
import SettingBody from "../../SettingBody";
import InfoTitle from "../InfoTitle.vue";
import { mapState } from "vuex";
export default {
  components: {
    InfoTitle,
    SettingBody,
  },
  props: {
    widen: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      languageList(state) {
        return state.core.language.languageOptions;
      },
      languageSelected(state) {
        return state.core.language.languageSelected;
      },
    }),
  },
  data() {
    return {};
  },
  methods: {
    handleSelect(item) {
      this.$tstore.dispatch("setLanguage", this.languageList[item]);
    },
  },
};
</script>

<style lang="less" scoped>
@name:~"language";
.@{name}-main{
  height:100%;
  background: #fff;
  display: flex;
  .@{name}-left{
    width: 240px;
  }
  .@{name}-right{
    position:relative;
    
    flex:1;
    .@{name}-content{
      padding: 96px 14px 14px 14px;
      width: 100%;
      max-width: 300px;
    }
  }

}
  .title{
    padding-top:32px;
    background: #fff;
    .title-name{
      padding:16px;
      font-size: 16px;
      font-weight: 900;
      color:#000;
    }
  }
  .widen-title{
    margin-left:240px;
  }
</style>