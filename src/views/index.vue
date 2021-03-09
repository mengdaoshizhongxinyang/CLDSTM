
<!--
 * _______________#########_______________________ 
 * ______________############_____________________ 
 * ______________#############____________________ 
 * _____________##__###########___________________ 
 * ____________###__######_#####__________________ 
 * ____________###_#######___####_________________ 
 * ___________###__##########_####________________ 
 * __________####__###########_####_______________ 
 * ________#####___###########__#####_____________ 
 * _______######___###_########___#####___________ 
 * _______#####___###___########___######_________ 
 * ______######___###__###########___######_______ 
 * _____######___####_##############__######______ 
 * ____#######__#####################_#######_____ 
 * ____#######__##############################____ 
 * ___#######__######_#################_#######___ 
 * ___#######__######_######_#########___######___ 
 * ___#######____##__######___######_____######___ 
 * ___#######________######____#####_____#####____ 
 * ____######________#####_____#####_____####_____ 
 * _____#####________####______#####_____###______ 
 * ______#####______;###________###______#________ 
 * ________##_______####________####______________ 
 * @Author: mengdaoshizhongxinyang
 * @Date: 2020-05-14 09:38:18
 * @LastEditTime: 2020-11-25 16:53:02
 * @LastEditors: Please set LastEditors
 * @Description: index page
 * @FilePath: \CLDSTM\src\views\index.vue
 -->
<template>
  <div class="main">
    <desktop></desktop>
    <desktop-icon
      v-for="(icon,index) in Object.keys(desktopIcons)"
      :x="Math.floor(index/desktopIconNum)*70"
      :y="Math.floor(index%desktopIconNum)*88"
      :key="desktopIcons[icon].name"
      :iconInfo="desktopIcons[icon]"
      iconStyle="filled"
      @openApps="handleOpenApps(desktopIcons[icon])"
    ></desktop-icon>

    <down-menu></down-menu>
    <component
      :is="item.apps"
      v-bind="item"
      :z="item.zindex"
      v-for="(item, index) in desktopApps.apps"
      :key="item.id"
      :appsId="index"
      v-show="!item.mini"
    ></component>
  </div>
</template>

<script lang="ts">
import {
  vscode,
  Frame,
  DownMenu,
  // Money,
  DesktopIcon,
  ArticleMd,
  Folder,
  Desktop,
  Properties,
  Setting
} from "@/components";

import { defineComponent,computed, nextTick } from "vue"

import moment from "moment";

import * as THREE from "three";
import {Camera,Scene,Renderer} from "three";
import {useStore} from "@/store"
import Proton from "./proton.js";

let proton:Proton, emitter:Proton.Emitter;
let camera:Camera, scene:Scene, renderer:Renderer;
let three = new THREE.Scene();

export default  defineComponent({
  components: {
    Folder,
    Frame,
    DownMenu,
    vscode,
    Desktop,
    DesktopIcon,
    // Money,
    ArticleMd,
    Properties,
    Setting
  },
  setup(props){
    
    const store=useStore()
    nextTick(()=>{
      store.dispatch('initAll')
    })
    const desktopIcons =computed(()=>{
        return store.state.view.desktop.fileList
    })
    const desktopApps=computed(()=>{
      // console.log(store.getters.desktopApps)
      return store.getters.desktopApps
    })
    const openApps=(icon:any)=>{
      store.dispatch('openApps',icon)
    }
    const activeApps=(index:any)=>{
      store.dispatch('activeApps',index)
    }
    return {desktopIcons,desktopApps,openApps,activeApps}
  },
  created() {
    this.desktopIconNum=Math.floor(document.body.offsetHeight/88)
  },
  data() {
    return {
      desktopIconNum:1,
      content: ""
    };
  },
  methods: {
    moment,
    handleOpenApps(icon:any) {
      this.openApps(icon);
      // this.$store.dispatch("openApps",icon)
    },
    handleActived(item:any, index:any) {
      this.activeApps(index);
      // this.$store.commit("activeApps",index)
      // this.$forceUpdate();
    },
    addScene() {
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        3000
      );
      camera.position.z = 500;
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0xffffff, 1);

      renderer = new THREE.WebGLRenderer();
      // renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.id="background"
      document.getElementById('app')!.appendChild(renderer.domElement);
      window.addEventListener("resize", this.onWindowResize, false);
    },
    addProton() {
      proton = new Proton();

      emitter = new Proton.Emitter();
      emitter.rate = new Proton.Rate(
        new Proton.Span(34, 48),
        new Proton.Span(0.2, 0.5)
      );
      emitter.addInitialize(new Proton.Mass(1));
      emitter.addInitialize(new Proton.Radius(new Proton.Span(10, 20)));

      var position = new Proton.Position();
      position.addZone(new Proton.BoxZone(2500, 10, 2500));
      emitter.addInitialize(position);

      emitter.addInitialize(new Proton.Life(5, 10));
      emitter.addInitialize(new Proton.Body(this.createSnow()));
      emitter.addInitialize(
        new Proton.Velocity(0, new Proton.Vector3D(0, -1, 0), 90)
      );

      emitter.addBehaviour(new Proton.RandomDrift(10, 1, 10, 0.05));
      emitter.addBehaviour(new Proton.Rotate("random", "random"));
      emitter.addBehaviour(new Proton.Gravity(2));

      var sceenZone = new Proton.ScreenZone(camera, renderer, 20, "234");
      emitter.addBehaviour(new Proton.CrossZone(sceenZone, "dead"));

      emitter.p.x = 0;
      emitter.p.y = 800;
      emitter.emit();

      proton.addEmitter(emitter);

      proton.addRender(new Proton.SpriteRender(scene));

      //Proton.Debug.drawZone(proton,scene,new Proton.BoxZone(800, 10, 800));
    },
    createSnow() {
      var map = new THREE.TextureLoader().load("./img/snow.png");
      var material = new THREE.SpriteMaterial({
        map: map,
        transparent: true,
        opacity: 0.5,
        color: 0xffffff,
      });
      return new THREE.Sprite(material);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      proton.update();
      renderer.render(scene, camera);
    },
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    initBackGround() {
      this.addScene();
      this.addProton();
      this.animate();
    },
  },
  mounted() {
    this.initBackGround();
  },
})
</script>
<style lang="less" scoped>
/* For demo */
.main {
  width: 100%;
  height: 100%;
}

::v-deep(.ant-fullcalendar-content) {
  position: static;
}
</style>

