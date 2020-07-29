<template>
  <Frame v-on="$listeners">
    <div>
      <a class="css-test">{{dm[rand]}}</a>
      <br />
      <button @click="reset">下一个</button>
    </div>
  </Frame>
</template>

<script>
import Frame from "@/components/Frame";
export default {
  components: {
    Frame,
  },
  data() {
    return {
      dm: [
        "白鸡面",
        "大娘水饺",
        "mc",
        "茶餐厅",
        "江西小炒",
        "手工面",
        "青海",
        "炸酱面",
        "煲",
        "厨师长",
        "咕锅面馆",
        "韩料",
        "黄焖鸡",
        "重庆面馆",
      ],
      rand: 0,
      d: "",
    };
  },
  methods: {
    reset() {
      this.rand = Math.floor(Math.random() * this.dm.length);
    },
    test(e) {
      console.log(e);
      if (e.key == "F11") {
        e.preventDefault();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.css-test {
  color: transparent;
  font-weight: bold;
  background: linear-gradient(90deg, red, orange, yellow, green, blue,blueviolet);
  background-clip: text;
  -webkit-background-clip: text;
  &:hover {
    color: transparent;
    transition: 300ms ease;
  }
}
</style>