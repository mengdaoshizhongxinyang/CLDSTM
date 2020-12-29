<template>
  <setting-frame
    name="设置"
    v-bind="$attrs"
    @resizing="handleResize"
    :minWidth="300"
    :minHeight="320"
    :initialW="w"
    :initialH="h"
    :initialX="0"
    :initialY="0"
    :drag-cancel="'.back-button'"
  >
    <template #header-name-more>
      <div class="left-title">
        <div
          class="back-button"
          v-if="operated.length"
          @click.stop="handleBack"
        >
          <icon-manage icon="arrowLeft"></icon-manage>
        </div>
        <div>设置</div>
      </div>
    </template>
    <template #content>
      <div class="content">
        <transition :name="actions">
          <component
            :is="component"
            class="sub-content"
            :width="w"
            :height="h"
            :widen="widen"
            @openSub="handleOpenSub"
          ></component>
        </transition>
      </div>
    </template>
  </setting-frame>
</template>

<script>
// import SettingFrame from "@/components/Frame";
import { Frame as SettingFrame,IconManage } from "@/components";
import { Transition } from "vue";
import Main from "./Main";
import {
  LanguageSetting,
  LanguageModule,
} from "./SubModule/LanguageSettingModule";
import { PersonaliseSetting } from "./SubModule/PersonaliseSettingModule";
import { mapState } from "vuex";
export default {
  components: {
    IconManage,
    Transition,
    PersonaliseSetting,
    LanguageSetting,
    SettingFrame,
    Main,
    LanguageModule,
  },
  computed: {
    ...mapState({
      settings(state) {
        return state.core.setting.settings;
      },
    }),
  },
  props: {
    subComponents: {
      type: String,
      default: "Main",
    },
  },
  created() {
    this.component = this.subComponents;
  },
  data() {
    return {
      w: 500,
      h: 500,
      component: "Main",
      operated: [],
      actions: "push",
      widen: true,
    };
  },
  methods: {
    handleResize(x, y, w, h) {
      this.w = w;
      this.h = h;
    },
    handleOpenSub(name) {
      if (name) {
        if (name == this.component) {
          return;
        }
        if (this.widen && name.indexOf("Setting") > -1) {
          const { settings } = this;
          this.handleOpenSub(settings[name][0].component);
        } else {
          this.operated.push(this.component);
          this.component = name;
        }
      }
    },
    handleBack() {
      this.component = this.operated.pop();
      if (this.widen && this.component.indexOf("Setting") > -1) {
        this.component = this.operated.pop();
      }
    },
  },
  watch: {
    w(val, oldVal) {
      if (oldVal >= 500 && val < 500) {
        this.widen = false;
      } else if (oldVal < 500 && val >= 500) {
        this.widen = true;
        if (this.component.indexOf("Setting") > -1) {
          const { settings } = this;
          this.handleOpenSub(settings[this.component][0].component);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  .sub-content {
    height: 100%;
    width: 100%;
    position: absolute;
  }
}
.left-title {
  display: flex;
  line-height: 32px;
  width: 104px;
  color: #000000;
  div {
    padding: 0 12px;
    line-height: 32px;
  }
  .back-button {
    height: 32px;
    width: 42px;
    background: rgba(0, 0, 0, 0);
    ::v-deep(.anticon) {
      cursor: default;
    }
    &:hover {
      color: #ffffff;
      background: rgb(0, 120, 215);
    }
  }
}
.push-enter-active {
  animation: bounce-in 0.5s;
}
.push-leave-active  /* .fade-leave-active below version 2.1.8 */ {
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.8);
    overflow: hidden;
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>