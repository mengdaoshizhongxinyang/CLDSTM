<template>
  <div class="main">
    <div style="height:100%;width:255px">
      <a-menu theme="light" style="height:100%" mode="inline">
        <template v-for="(item,i) in leftTree">
          <a-menu-item v-if="item.type!=='file'" :key="i" @click="openMD(item.name)">
            <span>{{item.name}}</span>
          </a-menu-item>
          <a-sub-menu v-else :key="i">
            <template v-slot:title>
              <span>{{item.name}}</span>
            </template>
            <a-menu-item v-for="(it,j) in item.children" :key="j" @click="openMD(it.name)">
              <span>{{it.name}}</span>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </div>
    <div style="height:100%;width:1500px" class="markdown-body">
      <VueMD :source="content" class="content"></VueMD>
    </div>
  </div>
</template>

<script>
import * as device from "@/../public/device.min.js";
import * as bundle from "@/../public/bundle.js";
import VueMD from "vue-markdown";
import * as THREE from "three";
console.log(THREE)
import config from "@/../public/config.js";
// console.log(()=>import("three.proton.js"))
import Proton from "./proton.js";
let proton, emitter;
let camera, scene, renderer;
let three = new THREE.Scene();
console.log(Proton)
if (config.signboard === true) {
  let modelUrl = "./haru02/haru02.model.json";
  loadlive2d("live2dcanvas", modelUrl);
}
export default {
  components: {
    VueMD
  },
  data() {
    return {
      openKeys: [],
      content: "",
      url: "@/../public/static/test.md",
      leftTree: config.file
    };
  },
  methods: {
    openMD(name) {
      import(`@/../public/static/${name}.md`).then(res => {
        console.log(res);
        this.$nextTick(function() {
          this.content = res.default;
        });
      });
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
      console.log(1)
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
        color: 0xffffff
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
    initBackGround(){
      this.addScene();
      this.addProton();
      this.animate();
    }
  },
  mounted(){
    this.initBackGround();
  }
};
</script>
<style lang="less" scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
<style lang="less">
.content {
  h1,
  h2,
  h3,
  h4 {
    color: #111111;
    font-weight: 400;
    margin-top: 1em;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: Georgia, Palatino, serif;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  dl {
    margin-bottom: 16px;
    padding: 0;
  }
  p {
    margin: 8px 0;
  }
  h1 {
    font-size: 48px;
    line-height: 54px;
  }
  h2 {
    font-size: 36px;
    line-height: 42px;
  }
  h1,
  h2 {
    border-bottom: 1px solid #efeaea;
    padding-bottom: 10px;
  }
  h3 {
    font-size: 24px;
    line-height: 30px;
  }
  h4 {
    font-size: 21px;
    line-height: 26px;
  }
  h5 {
    font-size: 18px;
    list-style: 23px;
  }
  a {
    color: #0099ff;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }
  a:hover {
    text-decoration: none;
    color: #ff6600;
  }
  a:visited {
    /*color: purple;*/
  }
  ul,
  ol {
    padding: 0;
    padding-left: 24px;
    margin: 0;
  }
  li {
    line-height: 24px;
  }
  p,
  ul,
  ol {
    font-size: 16px;
    line-height: 24px;
  }

  ol ol,
  ul ol {
    list-style-type: lower-roman;
  }

  pre {
    max-width: 100%;
    white-space: pre-wrap;
    line-height: 1.7em;
    overflow: auto;
    padding: 6px 10px;
  }

  code {
    font-family: Consolas, Monaco, Andale Mono, monospace;
    line-height: 1.5;
    font-size: 13px;
  }

  code,
  pre {
    border-radius: 3px;
    background-color: #f7f7f7;
    color: inherit;
  }

  code {
    font-family: Consolas, Monaco, Andale Mono, monospace;
    margin: 0 2px;
  }

  pre {
    line-height: 1.7em;
    overflow: auto;
    padding: 6px 10px;
    border-left: 5px solid #6ce26c;
  }

  pre > code {
    border: 0;
    display: inline;
    max-width: initial;
    padding: 0;
    margin: 0;
    overflow: initial;
    line-height: inherit;
    font-size: 0.85em;
    white-space: pre;
    background: 0 0;
  }

  code {
    color: #666555;
  }

  /** markdown preview plus 对于代码块的处理有些问题, 所以使用统一的颜色 */
  code .keyword {
    color: #8959a8;
  }

  code .number {
    color: #f5871f;
  }

  code .comment {
    color: #998;
  }

  aside {
    display: block;
    float: right;
    width: 390px;
  }
  blockquote {
    border-left: 0.5em solid #eee;
    padding: 0 0 0 2em;
    margin-left: 0;
  }
  blockquote cite {
    font-size: 14px;
    line-height: 20px;
    color: #bfbfbf;
  }
  blockquote cite:before {
    content: "\2014 \00A0";
  }

  blockquote p {
    color: #666;
  }
  hr {
    text-align: left;
    color: #999;
    height: 2px;
    padding: 0;
    margin: 16px 0;
    background-color: #e7e7e7;
    border: 0 none;
  }

  dl {
    padding: 0;
  }

  dl dt {
    padding: 10px 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: bold;
  }

  dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  dd {
    margin-left: 0;
  }

  /* Code below this line is copyright Twitter Inc. */

  button,
  input,
  select,
  textarea {
    font-size: 100%;
    margin: 0;
    vertical-align: baseline;
    *vertical-align: middle;
  }
  button,
  input {
    line-height: normal;
    *overflow: visible;
  }
  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  button,
  input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    cursor: pointer;
    -webkit-appearance: button;
  }
  input[type="checkbox"],
  input[type="radio"] {
    cursor: pointer;
  }
  /* override default chrome & firefox settings */
  input:not([type="image"]),
  textarea {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  input[type="search"] {
    -webkit-appearance: textfield;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  label,
  input,
  select,
  textarea {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: normal;
    line-height: normal;
    margin-bottom: 18px;
  }
  input[type="checkbox"],
  input[type="radio"] {
    cursor: pointer;
    margin-bottom: 0;
  }
  input[type="text"],
  input[type="password"],
  textarea,
  select {
    display: inline-block;
    width: 210px;
    padding: 4px;
    font-size: 13px;
    font-weight: normal;
    line-height: 18px;
    height: 18px;
    color: #808080;
    border: 1px solid #ccc;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  select,
  input[type="file"] {
    height: 27px;
    line-height: 27px;
  }
  textarea {
    height: auto;
  }
  /* grey out placeholders */
  :-moz-placeholder {
    color: #bfbfbf;
  }
  ::-webkit-input-placeholder {
    color: #bfbfbf;
  }
  input[type="text"],
  input[type="password"],
  select,
  textarea {
    -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
    -moz-transition: border linear 0.2s, box-shadow linear 0.2s;
    transition: border linear 0.2s, box-shadow linear 0.2s;
    -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  input[type="text"]:focus,
  input[type="password"]:focus,
  textarea:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
      0 0 8px rgba(82, 168, 236, 0.6);
    -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
      0 0 8px rgba(82, 168, 236, 0.6);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
      0 0 8px rgba(82, 168, 236, 0.6);
  }
  /* buttons */
  button {
    display: inline-block;
    padding: 4px 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    line-height: 18px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 1px 2px rgba(0, 0, 0, 0.05);
    background-color: #0064cd;
    background-repeat: repeat-x;
    background-image: -khtml-gradient(
      linear,
      left top,
      left bottom,
      from(#049cdb),
      to(#0064cd)
    );
    background-image: -moz-linear-gradient(top, #049cdb, #0064cd);
    background-image: -ms-linear-gradient(top, #049cdb, #0064cd);
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0%, #049cdb),
      color-stop(100%, #0064cd)
    );
    background-image: -webkit-linear-gradient(top, #049cdb, #0064cd);
    background-image: -o-linear-gradient(top, #049cdb, #0064cd);
    background-image: linear-gradient(top, #049cdb, #0064cd);
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    border: 1px solid #004b9a;
    border-bottom-color: #003f81;
    -webkit-transition: 0.1s linear all;
    -moz-transition: 0.1s linear all;
    transition: 0.1s linear all;
    border-color: #0064cd #0064cd #003f81;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  }
  button:hover {
    color: #fff;
    background-position: 0 -15px;
    text-decoration: none;
  }
  button:active {
    -webkit-box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15),
      0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15),
      0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15),
      0 1px 2px rgba(0, 0, 0, 0.05);
  }
  button::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
  table {
    *border-collapse: collapse; /* IE7 and lower */
    border-spacing: 0;
    width: 100%;
  }
  table {
    border: solid #ccc 1px;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    /*-webkit-box-shadow: 0 1px 1px #ccc;
      -moz-box-shadow: 0 1px 1px #ccc;
      box-shadow: 0 1px 1px #ccc;   */
  }
  table tr:hover {
    background: #fbf8e9;
    -o-transition: all 0.1s ease-in-out;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
  }
  table td,
  .table th {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }

  table th {
    background-color: #dce9f9;
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#ebf3fc),
      to(#dce9f9)
    );
    background-image: -webkit-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image: -moz-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image: -ms-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image: -o-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image: linear-gradient(top, #ebf3fc, #dce9f9);
    /*-webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;
      -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;
      box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;*/
    border-top: none;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    padding: 5px;
  }

  table td:first-child,
  table th:first-child {
    border-left: none;
  }

  table th:first-child {
    -moz-border-radius: 6px 0 0 0;
    -webkit-border-radius: 6px 0 0 0;
    border-radius: 6px 0 0 0;
  }
  table th:last-child {
    -moz-border-radius: 0 6px 0 0;
    -webkit-border-radius: 0 6px 0 0;
    border-radius: 0 6px 0 0;
  }
  table th:only-child {
    -moz-border-radius: 6px 6px 0 0;
    -webkit-border-radius: 6px 6px 0 0;
    border-radius: 6px 6px 0 0;
  }
  table tr:last-child td:first-child {
    -moz-border-radius: 0 0 0 6px;
    -webkit-border-radius: 0 0 0 6px;
    border-radius: 0 0 0 6px;
  }
  table tr:last-child td:last-child {
    -moz-border-radius: 0 0 6px 0;
    -webkit-border-radius: 0 0 6px 0;
    border-radius: 0 0 6px 0;
  }
}
</style>
