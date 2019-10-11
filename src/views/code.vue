<template>
  <div class="main-body">
    <VueDraggableResizable class="mobile" :drag-handle="'.drag-header'" :parent="true">
      <div style="width:100%;height:100%;background:#fff">
        <div class="drag-header"></div>
        <div style="height:calc(100% - 28px);overflow-x:hidden">
          <a-tree draggable :treeData="gData" @dragenter="onDragEnter" @drop="onDrop" @select="(key,node)=>selectComponent(key,node)"/>
        </div>
      </div>
    </VueDraggableResizable>
    <div style="width:20%;height:100%">
      <subAttribute v-model="selectedAttributes"></subAttribute>
    </div>
    <div class="code">
      <a-button style="position:fixed;right:0;top:0" @click="mount">refresh</a-button>
      <div
        style="margin-left:calc(50% - 188px);width:375px;height:667px;border:1px #000 solid"
        id="mbl"
      ></div>
    </div>
    <div style="width:20%;height:100%">
      <iconList v-model="tst"></iconList>
      <ul class="components-list">
        <li @dblclick="addTree('AInput')">
          输入框
          <a-input style="width:200px"></a-input>
        </li>
        <li @dblclick="addTree('AButton')">
          <a-button>button</a-button>
        </li>
      </ul>
    </div>
    <!-- <a-modal v-drap :visible="visiable" >
      <template v-slot:title>
        <div v-drap>
          fasfasfsa
        </div>
      </template>
    </a-modal>-->
  </div>
</template>

<script>
import subAttribute from "@/components/subAttribute.vue";
import Vue from "vue";
import VueDraggableResizable from "@/components/vue-draggable-resizable.vue";
import iconList from "@/components/iconSelect/iconList.vue";
import mount from "./mount";
import { getTemplate } from "@/template";

export default {
  components: {
    VueDraggableResizable,
    subAttribute,
    iconList
  },
  data() {
    return {
      tst: "",
      gData: [],
      visiable: true,
      dataSource: ["plus", "del"],
      key: 0,
      selectedAttributes: {attributes:{}}
    };
  },
  methods: {
    selectComponent(key,node){
      console.log(node)
      if(key.length>0){
        this.selectedAttributes=node.node.$vnode.data.props
      }else{
        this.selectedAttributes={attributes:{}}
      }
      
      console.log(this.selectedAttributes)
    },
    mount() {
      let template = "";
      this.gData.forEach(ele => {
        template += ele.template;
      });
      mount("mbl", this.gData);
      console.log(this.gData);
    },
    onSelect(value) {
      console.log("onSelect", value);
    },
    addTree(e) {
      console.log(getTemplate);
      let info = { name: e };
      let component = getTemplate(info);
      component["key"] = this.key;
      component["title"] = e;
      component["info"]=info;
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
    }
  },
  mounted(){
    console.log(this)
  }
};
</script>

<style lang="less" scoped>
.drag-header {
  height: 28px;
  width: 100%;
  border-bottom: 1px solid #aaa;
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
</style>