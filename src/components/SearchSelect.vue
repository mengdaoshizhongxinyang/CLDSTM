<template>
  <div class="select">
    <div class="select-action" ref="input">
      <a-icon type="minus" class="select-icon" @click="del"></a-icon>
      <input
        type="text"
        readonly
        class="select-action-input"
        :value="content"
        @click="show"
        @blur="close"
      />
      <a-icon type="plus" class="select-icon" @click="add" v-if="plus"></a-icon>
    </div>
    <div
      :class="['select-content']"
      :style="`width:${this.wid}px;top:${this.top};left:${this.left}`"
      v-if="this.visable"
    >
      <div
        v-for="(item,i) in data"
        :key="i"
        @click="onchange(item.name,item.value)"
        class="select-content-cell"
      >{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    plus: {
      type: Boolean,
      default: false
    },
    value:{
      type: String,
      default:'',
    }
  },
  data() {
    return {
      top: 0,
      left: 0,
      wid: 0,
      visable: false,
      content: "",
      dh: 0,
      table:{}
    };
  },
  methods: {
    show() {
      if (this.visable === true) {
        return;
      }
      this.top = this.$refs.input.offsetTop;
      this.left = this.$refs.input.offsetLeft;
      this.wid = this.$refs.input.offsetWidth;
      this.visable = true;
    },
    close() {
      setTimeout(() => {
        this.visable = false;
      }, 300);
    },
    onchange(name, value) {
      this.content = name;
      this.$emit("onChange", value);
    },
    add() {
      this.$emit("add");
    },
    del() {
      this.$emit("del");
    }
  },
  watch:{
    data:function(newData){
      this.data.forEach(element => {
        this.table[element.value]=element.name
      });
    }
  }
};
</script>

<style lang="less" scoped>
.select {
  width: 100%;
}
.select-icon {
  margin-top: 21px;
  color: #189fff;
  cursor: pointer;
}
.select-action {
  font-size: 18px;
  line-height: 60px;
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0 8px;
}
.select-action-input {
  background-color: #ffffff00;
  outline: #ffffff00;
  border: #ffffff00;
  width: 100%;
  margin-left: 24px;
  cursor: pointer;
}
.select-content {
  position: fixed;
  background: #ffffff;
  height: 120px;
  overflow-x: hidden;
  z-index: 999;
  transition: height 0.3s;
}
.select-content-del {
  height: 0;
  transition: height 0.3s;
}
.select-content-cell {
  padding: 6px;
  color: #000;
  cursor: pointer;
  width: 100%;
  height: 32px;
}
.select-content-cell:hover {
  background-color: #189fff;
}
</style>