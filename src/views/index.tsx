/**
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
* @Date: 2021-03-11 10:38:18
* @Description: index page
*/
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
  Setting,
  PrintScreen,
  SimpleNote
} from "@/components";

import { defineComponent, computed, nextTick, reactive, onMounted, h } from "vue"
import keyboardMessage from "@/utils/keyboard";
import md5 from "md5";
import * as THREE from "three";
import { Camera, Scene, Renderer } from "three";
import { useStore } from "@/store"
import Proton from "three.proton.js";
import style from "./index.module.less";
import domtoimage from 'dom-to-image';
let proton: Proton, emitter: Proton.Emitter;
let camera: Camera, scene: Scene, renderer: Renderer;
const components = {
  Folder,
  Frame,
  DownMenu,
  vscode,
  Desktop,
  DesktopIcon,
  // Money,
  ArticleMd,
  Properties,
  SimpleNote,
  Setting
}
export default defineComponent({
  components,
  setup(props) {
    const store = useStore()
    const data = reactive({
      desktopIconNum: Math.floor(document.body.offsetHeight / 88),
      content: "",
      src: ""
    })
    const keyboardMessageManage = keyboardMessage()
    async function loadImg(src:string){
      let img=new Image()
      img.src=src
      return new Promise<HTMLImageElement>((resolve,reject)=>{
        img.onload=()=>{
          resolve(img)
        }
        img.onerror=(e)=>{
          reject(e)
        }
      })
    }
    async function shot() {
      let node = document.getElementById('nav');
      let background = document.getElementById('background')! as HTMLCanvasElement;
      let tempCanvas=document.createElement('canvas')
      tempCanvas.width=background.width
      tempCanvas.height=background.height
      let context=tempCanvas.getContext("2d")!
      context.rect(0,0,tempCanvas.width,tempCanvas.height)

      let dataUrl=await domtoimage.toPng(node!)
      
      renderer.render(scene, camera);
      let imgData = renderer.domElement.toDataURL("image/jpeg");

      let backgroundImg=await loadImg(imgData)
      let contentImg=await loadImg(dataUrl)

      context.drawImage(backgroundImg,0,0,tempCanvas.width,tempCanvas.height)
      context.drawImage(contentImg,0,0,tempCanvas.width,tempCanvas.height)

      data.src = tempCanvas.toDataURL();


    }
    function shotHotKey() {
      let message = keyboardMessageManage.getMessage()
      if (message) {
        const { event } = message

        if (event.key == 'a' && event.altKey == true) {
          console.log('A')
          message.isHandle = true
          shot()
          event.preventDefault()
        }
      }
      setTimeout(shotHotKey, 10);
    }
    shotHotKey()
    store.dispatch('initAll')

    const desktopIcons = computed(() => {
      return store.state.view.desktop.fileList
    })
    const desktopApps = computed(() => {
      return store.getters.desktopApps
    })
    const openApps = (icon: any) => {
      store.dispatch('openApps', icon)
    }
    const activeApps = (index: any) => {
      store.dispatch('activeApps', index)
    }

    function handleOpenApps(icon: any) {
      openApps(icon);
      // this.$store.dispatch("openApps",icon)
    }
    function handleActived(item: any, index: any) {
      activeApps(index);
      // this.$store.commit("activeApps",index)
      // this.$forceUpdate();
    }
    function addScene() {
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
      renderer.domElement.id = "background"
      document.getElementById('app')!.appendChild(renderer.domElement);
      window.addEventListener("resize", onWindowResize, false);
    }
    function addProton() {
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
      emitter.addInitialize(new Proton.Body(createSnow()));
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
    }
    function createSnow() {
      var map = new THREE.TextureLoader().load("./img/snow.png");
      var material = new THREE.SpriteMaterial({
        map: map,
        transparent: true,
        opacity: 0.5,
        color: 0xffffff,
      });
      return new THREE.Sprite(material);
    }
    function animate() {
      requestAnimationFrame(animate);
      render();
    }
    function render() {
      proton.update();
      renderer.render(scene, camera);
    }
    function onWindowResize() {
      // camera.aspect = window.innerWidth / window.innerHeight;
      // camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function initBackGround() {
      addScene();
      addProton();
      animate();
    }
    onMounted(() => {
      initBackGround()
    })
    desktopApps.value.apps.map(item => {
      item.apps
    })
    return () => h(
      <div class={style["main"]}>
        <Desktop></Desktop>
        {
          Object.keys(desktopIcons.value).map((icon, index) => {
            return <DesktopIcon
              x={Math.floor(index / data.desktopIconNum) * 70}
              y={Math.floor(index % data.desktopIconNum) * 88}
              iconInfo={desktopIcons.value[icon]}
              onOpenApps={() => handleOpenApps(desktopIcons.value[icon])}
            ></DesktopIcon>
          })
        }
        <DownMenu></DownMenu>
        {
          desktopApps.value.apps.map((item, index) => {
            return h(
              components[item.apps as keyof typeof components],
              {
                // z:item.id,
                icon: item.icon,
                key: item.id,
                appsId: index,
                name: item.name,
                z: item.zindex,
                style: { display: item.mini ? "none" : "block" },
                ...item.contents
              }
            )
          })
        }
        <PrintScreen src={data.src}></PrintScreen>
      </div>
    )
  }
})