<template>
  <Frame v-on="$listeners" v-bind="$attrs">
    <div class="floder">
      <div class="floder-menu"></div>
      <div class="floder-address"></div>
      <div class="floder-content">
        <div class="floder-content-tree"></div>
        <div class="floder-content-list">
          <div
            class="icon"
            tabindex="-1"
            @dblclick="handleOpenApps(icon)"
            v-for="icon in children"
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
import { Frame } from "@/components";
import { DesktopIcon } from "@/components";
import { mapActions,mapMutations,mapState,mapGetters } from "vuex";
import { SET_RUNING_APPS } from "@/store/modules";
export default {
  props: {
    children: {
      type:Array,
      default:()=>{
        return []
      }
    },
  },
  components: {
    DesktopIcon,
    Frame,
  },
  methods:{
    handleOpenApps(icon) {
      console.log(icon)
      this.$store.commit(SET_RUNING_APPS,icon)
    },
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
      display: flex;
      flex-wrap:  wrap;
      align-content: flex-start;
      .icon {
        position: relative;
        width: 74px;
        height:88px;
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
</style>
