<template>
  <Frame
    :scrollY="false"
    :minWidth="400"
    :minHeight="832"
    :initialH="832"
    :initialW="400"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <div tabindex="-1" @keydown="keydownOpitions" class="money-main" ref="body">
      <a-button v-if="!isStart" @click="start" type="primary">开始</a-button>
      <div v-for="(coins, coinsIndex) in money" :key="coinsIndex" style="width:50px">
        <div v-for="(coin, coinIndex) in coins" :key="coinIndex" class="coin">{{moneyType[coin]}}</div>
      </div>
      <div class="person" ref="person" style="left:0"></div>
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
      let person = this.$el.person
      
      if(e.key=='ArrowLeft'){
        this.$refs.person.style.left=this.$refs.person.left+50
      }
      console.dir(this.$refs.person.style.left)
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
      this.timingEvent=setInterval(this.addLayer,2000)
    },
    addLayer(num = 1) {
      const { money } = this;
      let start=new Date().getTime()
      let maxLength=0
      for (let i = 0; i < num; i++) {
        for (let j = 0; j < 8; j++) {
          money[j].unshift(Math.floor(Math.random(6) * 6));
          maxLength=Math.max(money[j].length)
        }
      }
      
      this.$nextTick(()=>{
        let end=new Date().getTime()
        console.log(start,end,end-start)
      })
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
  position:relative;
  .coin {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin: 2px;
    text-align: center;
    line-height: 48px;
  }
  .person{
    position: absolute;
    color: white;
    bottom: 0px;
    background-color: #1890ff;
    width: 50px;
    height: 50px;
  }
}
</style>