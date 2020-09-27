<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three"
export default {
  data() {
    return {
      seashader: {
        vs: `
        uniform float time;

        void main(){
            float x = position.x;
            float y = position.y;
            float PI = 3.141592653589;

            float sz = 0.0;
            float ti = 0.06;
            float index = 1.0;
            vec2 dir;//波的方向
            //四条正弦波相加
            for(int i = 0;i<4;i++){
                ti = ti + 0.0005;
                index = index + 0.1;
                if(mod(index,2.0)==0.0){
                    dir = vec2(1.0,ti);
                }else{
                    dir = vec2(-1.0,ti);
                }
                float l1 = 2.0 * PI / (0.5);//波长
                float s1 = 10.0 * 2.0 / l1;//速度
                float z1 = 1.0 * sin(dot(normalize(dir),vec2(x,y)) * l1 + time * s1);//正弦波方程式
                sz +=z1;
            }
            gl_Position = projectionMatrix * modelViewMatrix * vec4(x,y,sin(sz) * 10.0,1.0);
        }
    		`,
        fs: `
        void main(){
            gl_FragColor = vec4(90./255.,160./255.,248./255.,1.0);      
        }
    		`,
      },
      gerstnershader: {
        vs: `
        uniform float time;

        void main(){
            float x = position.x;
            float y = position.y;
            float PI = 3.141592653589;

            float sx = 0.0;
            float sy = 0.0;
            float sz = 0.0;

            float ti = 0.0;
            float index = 1.0;
            vec2 dir;
            for(int i = 0;i<3;i++){
                ti = ti + 0.0005;
                index +=1.0;
                if(mod(index,2.0)==0.0){
                    dir = vec2(1.0,ti);
                }else{
                    dir = vec2(-1.0,ti);
                }
                float l1 = 2.0 * PI / (0.5 + ti);//波长
                float s1 = 20.0 * 2.0 / l1;//速度
                float x1 = 1.0 * dir.x * cos(dot(normalize(dir),vec2(x,y)) * l1 + time * s1);
                float y1 = 1.0 * dir.y * cos(dot(normalize(dir),vec2(x,y)) * l1 + time * s1);
                float z1 = 1.0 * cos(dot(normalize(dir),vec2(x,y)) * l1 + time * s1);
                sx +=x1;
                sy +=y1;
                sz +=z1;
            }
            sx = x + sx;
            sy = y + sy;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(sx,sy,sin(sz) * 10.0,1.0);
        }
    `,
        fs: `
        void main(){
            gl_FragColor = vec4(90./255.,160./255.,248./255.,1.0);      
        }
    `,
      },
      camera: null,
      scene: null,
      renderer: null,
      seaMaterial: null,
      geometry: null,
      mesh: null,
      container: null,
    };
  },
  methods: {
    planeGeometry() {
      this.seaMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { type: "f", value: 0 },
        },
        vertexShader: this.gerstnershader.vs,
        fragmentShader: this.gerstnershader.fs,
        side: THREE.DoubleSide,
        wireframe: true,
      });
      this.geometry = new THREE.PlaneGeometry(500, 500, 20, 25);
      let plane = new THREE.Mesh(this.geometry, this.seaMaterial);
      plane.rotation.x = -Math.PI / 2;
      this.scene.add(plane);
    },
    init() {
      this.container = document.getElementById("container");

      this.camera = new THREE.PerspectiveCamera(
        20,
        window.innerWidth / window.innerHeight,
        1,
        3000
      );
      this.camera.position.set(800, 800, 800);
      this.camera.lookAt(0, 0, 0);
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xffffff);

      this.scene.add(new THREE.AmbientLight(0x444444));
      let axesHelper = new THREE.AxesHelper(150);

      this.scene.add(axesHelper);

      this.planeGeometry();
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);
    },

    animate() {
      requestAnimationFrame(this.animate);

      if (this.seaMaterial) {
        this.seaMaterial.uniforms.time.value += 0.01;
      }
      this.render();
		},
		render(){
			this.renderer.render( this.scene, this.camera );
		}
	},
	mounted(){
		this.init()
		this.animate()
	}
};
</script>

<style lang="less" scoped>
</style>