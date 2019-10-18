<template>
  <div class="main-body"  @contextmenu.prevent>
                
    <transition name="treeFade">
      <VueDraggableResizable
        class="mobile"
        :drag-handle="'.drag-header'"
        :parent="true"
        v-if="treeIsShow"
        :z="2"
        id='test'
      >
        
        <div style="width:100%;height:100%;background:#fff">
          <div class="drag-header">
            <div>treeNode</div>
            <div style="display:flex">
              <div class="close-icon" @click="closeTree">
                <a-icon type="close"></a-icon>
              </div>
            </div>
          </div>
          <div style="height:calc(100% - 28px);overflow-x:hidden">
            <div v-rightclick style="display:none;position:fixed;z-index:99999">
          <div>删除</div>
          <div>复制</div>
        </div>
            <a-tree
              draggable
              :treeData="gData"
              @dragenter="onDragEnter"
              @drop="onDrop"
              @select="(key,node)=>selectComponent(key,node)"
            />
          </div>
        </div>
      </VueDraggableResizable>
    </transition>
    <div style="width:20%;height:100%">
      <subAttribute v-model="selectedAttributes"></subAttribute>
    </div>
    <div class="code">
      <div v-rightclick style="display:none;position:fixed;z-index:99999">
          <div>删除</div>
          <div>复制</div>
          <div>测试</div>
        </div>
      <a-button style="position:fixed;left:0;bottom:0" @click="mount">refresh</a-button>
      <div id="mbl">
        
      </div>
    </div>
    <div style="width:20%;height:100%">
      <a-tabs defaultActiveKey="Antd" :style="{ height: '100%'}" @change="callback">
        <a-tab-pane tab="antd" key="Antd">
          <div class="tab-content">
            <ul class="components-list">
              <li @dblclick="addTree('AInput')">
                输入框
                <a-input style="width:200px"></a-input>
              </li>
              <li @dblclick="addTree('AButton')">
                <a-button>button</a-button>
              </li>
              <li @dblclick="addTree('AIcon')">
                <a-icon type="smile"></a-icon>
              </li>
            </ul>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="自定义" key="Design">
          <div class="tab-content">
            <ul class="components-list">
              <li @dblclick="addTree('PCLeftRight')">
                左右
                <PCLeftRight style="width:200px"></PCLeftRight>
              </li>
            </ul>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

    
  </div>
</template>

<script>
import VueContextMenu from "@/components/rightClickMenu/VueContextMenu.vue";
import subAttribute from "@/components/subAttribute.vue";
import Vue from "vue";
import VueDraggableResizable from "@/components/vue-draggable-resizable.vue";
import mount from "./mount";
import components from "@/components";
import { getTemplate } from "@/template";
export default {
  components: {
    VueContextMenu,
    VueDraggableResizable,
    subAttribute,
    ...components
  },
  data() {
    return {
      treeIsShow: true,
      tst: "",
      gData: [],
      visiable: true,
      dataSource: ["plus", "del"],
      key: 0,
      type: "",
      show: false,
      contextMenuTarget: document.body,
      selectedAttributes: { attributes: {}, slot: "" }
    };
  },
  methods: {
    copyMsg() {
      console.log("copy");
    },
    callback(val){
      this.type = val;
    },
    hidden() {
      this.visiable = false;
    },
    closeTree() {
      this.treeIsShow = !this.treeIsShow;
    },
    changeSlot(e) {
      console.log(e);
    },
    selectComponent(key, node) {
      console.log(node.node.$parent);
      if (key.length > 0) {
        this.selectedAttributes = node.node.$vnode.data.props;
      } else {
        this.selectedAttributes = { attributes: {}, slot: "" };
      }

      console.log(this.selectedAttributes.slot);
    },
    mount() {
      let template = "";
      this.gData.forEach(ele => {
        template += ele.template;
      });
      mount("mbl", this.gData);
      console.log(this.gData);
      // this.treeIsShow = !this.treeIsShow;
    },
    onSelect(value) {
      console.log("onSelect", value);
    },
    addTree(e) {
      let info = { name: e, type: this.type };

      let component = getTemplate({ info });
      component["key"] = this.key;
      component["title"] = e;
      component["info"] = info;
      this.key++;
      this.gData.push(component);
      console.log(component);
    },
    onDragEnter(info) {
      // expandedKeys 需要受控时设置
      // this.expandedKeys = info.expandedKeys
    },
    onDrop(info) {
      const dropKey = info.node.eventKey;
      const dragKey = info.dragNode.eventKey;
      const dropPos = info.node.pos.split("-");
      const dropPosition =
        info.dropPosition - Number(dropPos[dropPos.length - 1]);
      const loop = (data, key, callback) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            return callback(item, index, arr);
          }
          if (item.children) {
            return loop(item.children, key, callback);
          }
        });
      };
      const data = [...this.gData];

      // Find dragObject
      let dragObj;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });
      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, item => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj);
        });
      } else if (
        (info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, item => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.unshift(dragObj);
        });
      } else {
        let ar;
        let i;
        loop(data, dropKey, (item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj);
        } else {
          ar.splice(i + 1, 0, dragObj);
        }
      }
      this.gData = data;
      console.log(this.gData);
    }
  },
  watch: {
    selectedAttributes: function(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.drag-header {
  height: 28px;
  width: 100%;
  border-bottom: 1px solid #aaa;
  display: flex;
  justify-content: space-between;
}
.main-body {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}
.code {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
    0 1px 4px rgba(0, 0, 0, 0.117647);
  width: 60%;
  height: 100%;
}
.mobile {
  // display: none;
  box-shadow: 0 14px 45px rgba(0, 0, 0, 0.247059),
    0 10px 18px rgba(0, 0, 0, 0.219608);
}
.components-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.components-list * {
  cursor: move !important;
}

.components-list > li {
  min-height: 36px;
  font-size: 18px;
  -webkit-user-select: none;
  transform: scale(0.7) translateX(-15%);
  padding-bottom: 10px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1) translateX(5%);
  }
  i {
    vertical-align: middle;
  }
}

.close-icon {
  padding: 0 6px;
  cursor: default;
  color: #000;
  &:hover {
    background: #ff0000;
    color: #fff;
  }
}
.treeFade-enter-active {
  transition: opacity 0.5s;
  animation: treeFade-in 0.5s;
}
.treeFade-leave-active {
  transition: opacity 0.5s;
  animation: treeFade-in 0.5s reverse;
}
@keyframes treeFade-in {
  0% {
    transform: scale(0.6) translateY(100px);
  }
  100% {
    transform: scale(1);
  }
}
.treeFade-enter,
.treeFade-leave-to {
  opacity: 0;
}
.tab-content {
  padding: 4px;
}


.right-menu {
  position: fixed;
  background: #fff;
  border: solid 1px rgba(0, 0, 0, .2);
  border-radius: 3px;
  z-index: 999;
  display: none;
}
.right-menu a {
  width: 75px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  display: block;
  color: #1a1a1a;
}
.right-menu a:hover {
  background: #eee;
  color: #fff;
}
.right-menu {
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
    border-radius: 1px;
}
a {
    text-decoration: none;
}
.right-menu a {
    padding: 2px;
}
.right-menu a:hover {
    background: #42b983;
}
</style>