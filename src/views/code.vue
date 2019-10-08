<template>
  <div class="main-body">
    <div style="width:20%;height:100%"></div>
    <div class="code">
      <div style="width:200px;height:200px;border:1px #000 solid">
        <a-tree
          draggable
          :treeData="gData"
          @dragenter="onDragEnter"
          @drop="onDrop"
        />
      </div>
      <div style="margin-left:calc(50% - 188px);width:375px;height:667px;border:1px #000 solid"></div>
      <VueDraggableResizable class="mobile" :resizable="false" :w="375" :h="667"></VueDraggableResizable>
    </div>
    <div style="width:20%;height:100%"></div>
  </div>
</template>

<script>
import VueDraggableResizable from "@/components/vue-draggable-resizable.vue";
import mount from "./mount";
export default {
  components: {
    VueDraggableResizable
  },
  data(){
      return{
          gData:[{title:'1',key:1},{title:'2',key:2}]
      }
  },
  methods: {
    onDragEnter (info) {
    // expandedKeys 需要受控时设置
    // this.expandedKeys = info.expandedKeys
    },
    onDrop (info) {
      const dropKey = info.node.eventKey
      const dragKey = info.dragNode.eventKey
      const dropPos = info.node.pos.split('-')
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
      const loop = (data, key, callback) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            return callback(item, index, arr)
          }
          if (item.children) {
            return loop(item.children, key, callback)
          }
        })
      }
      const data = [...this.gData]

      // Find dragObject
      let dragObj
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1)
        dragObj = item
      })
      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj);
        });
      } else if (
        (info.node.children || []).length > 0 // Has children
        && info.node.expanded // Is expanded
        && dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, (item) => {
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
      this.gData = data
    },
  },
};
</script>

<style lang="less" scoped>
.main-body {
  width: 100%;
  height: 100%;
  display: flex;
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