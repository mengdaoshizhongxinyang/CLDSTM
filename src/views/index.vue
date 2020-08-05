<template>
  <div class="main">
    <div class="desktop"></div>

    <!-- <vscode>
      
    </vscode>-->
    <desktop-icon></desktop-icon>
    

    <down-menu></down-menu>
    <component
      :is="item.apps"
      v-bind="item.binds"
      :z="item.zindex"
      v-for="(item, index) in desktopApps.apps"
      :key="item.id"
      @activated="handleActived(item,index)"
      @close="handleAppClose(item,index)"
    ></component>
    <article-md v-bind="art.bind" v-for="(art, index) in artlist" :key="index"></article-md>
  </div>
</template>

<script>
import { vscode, Frame, DownMenu, Money,DesktopIcon,ArticleMd } from "@/components";

import moment from "moment";
import * as device from "@/../public/device.min.js";
import * as bundle from "@/../public/bundle.js";
import * as THREE from "three";

const pinyin = require("@/components/PinYin/index");

import Proton from "./proton.js";
import Tree from "@/components/Tree.vue";
let proton, emitter;
let camera, scene, renderer;
let three = new THREE.Scene();

export default {
  components: {
    Frame,
    DownMenu,
    Tree,
    vscode,
    DesktopIcon,
    Money,
    ArticleMd
  },
  created(){
    this.artlist=config.getFile()
    console.log(config.getFile())
  },
  data() {
    return {
      desktopApps: {
        apps: [
          {
            apps: "Money",
            binds: {},
            id: 1,
            zindex:1
          },
          {
            apps: "Tree",
            binds: {},
            id: 2,
            zindex:2
          }
        ],
        maxZindex:2
      },
      timeR: [],
      openKeys: [],
      content: "",
      th: 300,
      ix: 0,
      artlist:[]
    };
  },
  methods: {
    moment,
    handleActived(item,index) {
      const{desktopApps}=this
      item.zindex=++this.desktopApps.maxZindex
      this.$forceUpdate()
    },
    handleAppClose(item,index) {
      this.desktopApps.apps.splice(index,1);
    },
    openMD(name) {
      let res=require.context(`@/../public/static/`,true,/\.js$/)
      console.log(res)
      this.content = res.default;
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
      scene.fog = new THREE.FogExp2(0xffffff, 1, 10000);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(renderer.domElement);
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
    this.openMD()
  },
};
</script>
<style lang="less" scoped>
/* For demo */
.main {
  width: 100%;
  height: 100%;
}
.desktop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
/deep/.ant-fullcalendar-content {
  position: static;
}
</style>

