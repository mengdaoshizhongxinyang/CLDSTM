<template>
  <setting-body v-bind="$attrs" :widen="widen">
    <div class="language-left" v-if="widen">
      <menu-list :widen="widen" from="Language"></menu-list>
    </div>
    <div class="language-right" :style="`margin-left:${widen?240:0}px`">
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

    <template #title>
      <div :class="`title`">
        <div class="title-name">语言设置</div>
      </div>
    </template>
  </setting-body>
</template>

<script>
import SettingBody from "../../SettingBody";
import InfoTitle from "../InfoTitle.vue";
import { mapState } from "vuex";
import MenuList from "../MenuList";
export default {
  components: {
    InfoTitle,
    SettingBody,
    MenuList
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
    return {
      list: [{ name: "语言", icon: "font-colors", component: "LanguageModule" }],
    };
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

  .@{name}-left{
    width: 240px;
    height: 100%;
    position: absolute;
  }
  .@{name}-right{
    background: #fff;
    min-height: 100%;
    .@{name}-content{
      padding: 96px 14px 14px 14px;
      width: 100%;
      max-width: 300px;
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
</style>