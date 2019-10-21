<template>
  <div class="container" @mousemove="e=>mouseMove(e)" ref="maindiv">
    <div class="piece-box">
      <div class="piece-line">
        <div class="piece" style="transform: rotateY(36deg) translateZ(215px)">1</div>
        <div class="piece" style="transform: rotateY(18deg) translateZ(49px)">2</div>
        <div class="piece" style="transform: rotateY(0deg) translateZ(10px)">3</div>
        <div class="piece" style="transform: rotateY(-18deg) translateZ(49px)">4</div>
        <div class="piece" style="transform: rotateY(-36deg) translateZ(215px)">5</div>
      </div>
      <div class="piece-line">
        <div class="piece" style="transform: rotateY(36deg) translateZ(215px)">1</div>
        <div class="piece" style="transform: rotateY(18deg) translateZ(49px)">2</div>
        <div class="piece" style="transform: rotateY(0deg) translateZ(10px)">3</div>
        <div class="piece" style="transform: rotateY(-18deg) translateZ(49px)">4</div>
        <div class="piece" style="transform: rotateY(-36deg) translateZ(215px)">5</div>
      </div>
      <div class="piece-line">
        <div class="piece" style="transform: rotateY(36deg) translateZ(215px)">1</div>
        <div class="piece" style="transform: rotateY(18deg) translateZ(49px)">2</div>
        <div class="piece" style="transform: rotateY(0deg) translateZ(10px)">3</div>
        <div class="piece" style="transform: rotateY(-18deg) translateZ(49px)">4</div>
        <div class="piece" style="transform: rotateY(-36deg) translateZ(215px)">5</div>
      </div>
      <div class="piece-line">
        <div class="piece" style="transform: rotateY(36deg) translateZ(215px)">1</div>
        <div class="piece" style="transform: rotateY(18deg) translateZ(49px)">2</div>
        <div class="piece" style="transform: rotateY(0deg) translateZ(10px)">3</div>
        <div class="piece" style="transform: rotateY(-18deg) translateZ(49px)">4</div>
        <div class="piece" style="transform: rotateY(-36deg) translateZ(215px)">5</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    mouseMove(e) {
        console.log(e)
        this.$refs.maindiv.style['perspectiveOrigin']=`${e.clientX}px ${e.clientY}px`
        console.log(this.$refs.maindiv.style)
    }
  },
  mounted(){
      console.log(this.$refs.maindiv.style)
  }
};
</script>

<style lang="less" scoped>
.container {
  transform-style: preserve-3d;
  perspective: 1100px;
  height: 100%;
}
.piece-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}
.piece-line {
  width: 1600px;
  display: flex;
  justify-content: space-between;
}
.piece {
  width: 240px;
  /* transform: rotateY(45deg); */
  height: 182px;

  background: #000;
  color: #fff;
}
</style>