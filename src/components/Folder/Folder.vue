<template>
  <Frame v-on="$listeners" v-bind="$attrs">
    <div class="floder">
      <div class="floder-menu"></div>
      <div class="floder-address">
        <a-button
          size="small"
          icon="arrow-left"
          class="floder-address-button"
          :disabled="backStack.length==0"
          @click="handleBack"
        ></a-button>
        <a-button
          size="small"
          icon="arrow-right"
          class="floder-address-button"
          :disabled="nextStack==0"
          @click="handleNext"
        ></a-button>
        <a-button size="small" icon="down" class="floder-address-button" disabled></a-button>
        <a-button size="small" icon="arrow-up" class="floder-address-button" disabled></a-button>
        <a-input size="small" class="floder-address-input"></a-input>
        <a-button
          size="small"
          icon="redo"
          class="floder-address-button floder-address-input-suffix"
        ></a-button>
        <a-input size="small" class="floder-address-search">
          <template #suffix>
            <a-icon type="search"></a-icon>
          </template>
        </a-input>
      </div>
      <div class="floder-content">
        <div class="floder-content-tree">
          <tree></tree>
        </div>
        <div class="floder-content-list">
          <div
            class="icon"
            tabindex="-1"
            @dblclick="handleOpenApps(icon)"
            v-for="icon in folderList"
            :key="icon.name"
            :name="icon.name"
            :icon="icon.icon"
          >
            <div class="icon-content">
              <slot>
                <div class="icon-content-default">
                  <a-icon :type="icon.icon" theme="filled" />
                </div>
              </slot>
            </div>
            <div class="icon-text">{{icon.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </Frame>
</template>

<script>
import Tree from "../Tree";
import { DesktopIcon,Frame } from "@/components";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import { SET_RUNING_APPS } from "@/store/modules";
export default {
  props: {
    children: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    DesktopIcon,
    Tree,
    Frame
  },
  data() {
    return {
      folderList: [],
      backStack: [],
      nextStack: []
    };
  },
  computed: {
    ...mapGetters(["desktopApps"])
  },

  methods: {
    handleOpenApps(icon) {
      let { folderList, backStack } = this;
      if (icon.type == "folder") {
        backStack.push(folderList);
        folderList = icon.bind.children;
        Object.assign(this, {
          folderList,
          nextStack: []
        });
      } else {
        this.$store.commit(SET_RUNING_APPS, icon);
      }
    },
    handleBack() {
      let { folderList, backStack, nextStack } = this;
      let backFolder = backStack.pop();
      nextStack.push(folderList);
      Object.assign(this, {
        backStack,
        nextStack,
        folderList: backFolder
      });
    },
    handleNext() {
      let { folderList, backStack, nextStack } = this;
      let backFolder = nextStack.pop();
      backStack.push(folderList);
      Object.assign(this, {
        backStack,
        nextStack,
        folderList: backFolder
      });
    }
  },
  mounted() {
    this.folderList = this.children;
  }
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
    display: flex;
    padding: 4px 8px;
    min-width: 400px;
    &-button {
      border: 0;
      font-size: 12px;
      color: #888;
      &:disabled {
        color: #dfdfdf;
        background: #fff;
        cursor: default;
      }
    }
    &-input-suffix,
    &-input {
      border-radius: 0;
      border: 1px solid #d9d9d9;
      &:focus {
        // outline: 0;
        border: 1px solid #1890ff;
        box-shadow: none
      }
    }

    &-input {
      flex: 1;
    }
    &-input-suffix {
      border-left: 0;
    }
    &-search {
      margin-left: 12px;
      width: 98px;
      /deep/.ant-input {
        border-radius: 0;
      }
    }
  }

  &-content {
    flex: 1;
    display: flex;
    &-tree {
      width: 154px;
    }
    &-list {
      flex: 1;
      min-width: 150px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      .icon {
        position: relative;
        width: 74px;
        height: 88px;
        cursor: pointer;
        &-content {
          width: 100%;
          height: 54px;
          &-default {
            line-height: 1.2em;
            color: #000;
            font-size: 42px;
            text-align: center;
          }
        }
        &-text {
          color: #000;
          text-align: center;
          line-height: 1.2em;
        }
        &:hover {
          background: rgba(230, 242, 255, 0.85);
        }
        &:focus {
          background: rgba(204, 229, 255, 0.35);
        }
      }
    }
  }
}
/deep/.ant-input{
  &:focus{
    box-shadow: none;
  }
}
</style>
