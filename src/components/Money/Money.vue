<template>
  <Frame
    :scrollY="false"
    :minWidth="400"
    :minHeight="800"
    :initialH="800"
    :initialW="400"
    v-on="$listeners"
  >
    <div tabindex="-1" @keydown="keydownOpitions" class="money-main" ref="body">
      <a-button v-if="!isStart" @click="start"></a-button>
      <div v-for="(coins, coinsIndex) in money" :key="coinsIndex" style="width:50px">
        <div v-for="(coin, coinIndex) in coins" :key="coinIndex" class="coin">{{moneyType[coin]}}</div>
      </div>
    </div>
  </Frame>
</template>

<script>
import Frame from "@/components/Frame";
export default {
  components: {
    Frame
  },
  data() {
    return {
      money: [[], [], [], [], [], [], [], []],
      status: 7,
      moneyType: [1, 5, 10, 50, 100, 500],
      isStart: false,
      timingEvent:null
    };
  },
  methods: {
    keydownOpitions(e) {
      console.log(e);
    },
    start() {
      this.isStart = true;
      this.initGame();
      this.$refs.body.focus();
    },
    end(){
        this.isStart=false
        clearInterval(this.timingEvent)
        this.money=[[], [], [], [], [], [], [], []]
    },
    initGame() {
      this.addLayer(5)
      requestAnimationFrame
      this.timingEvent=setInterval(this.addLayer,2000)
    },
    addLayer(num = 1) {
      const { money } = this;
      let maxLength=0
      for (let i = 0; i < num; i++) {
        for (let j = 0; j < 8; j++) {
          money[j].unshift(Math.floor(Math.random(6) * 6));
          maxLength=Math.max(money[j].length)
        }
      }
      if(maxLength>15){
          this.end()
      }
    }
  }
};
</script>

<style lang="less" scoped>
.money-main {
  width: 400px;
  height: 800px;
  display: flex;
  .coin {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin: 2px;
    text-align: center;
    line-height: 48px;
  }
}
</style>