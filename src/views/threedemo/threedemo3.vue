<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three"
let WaterRefractionShader = {

	uniforms: {

		"color": {
			value: null
		},

		"time": {
			value: 0
		},

		"tDiffuse": {
			value: null
		},

		"tDudv": {
			value: null
		},

		"textureMatrix": {
			value: null
		}

	},

	vertexShader: [

		"uniform mat4 textureMatrix;",

		"varying vec2 vUv;",
		"varying vec4 vUvRefraction;",

		"void main() {",

		"	vUv = uv;",

		"	vUvRefraction = textureMatrix * vec4( position, 1.0 );",

		"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform vec3 color;",
		"uniform float time;",
		"uniform sampler2D tDiffuse;",
		"uniform sampler2D tDudv;",

		"varying vec2 vUv;",
		"varying vec4 vUvRefraction;",

		"float blendOverlay( float base, float blend ) {",

		"	return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );",

		"}",

		"vec3 blendOverlay( vec3 base, vec3 blend ) {",

		"	return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ),blendOverlay( base.b, blend.b ) );",

		"}",

		"void main() {",

		" float waveStrength = 0.1;",
		" float waveSpeed = 0.03;",

		// simple distortion (ripple) via dudv map (see https://www.youtube.com/watch?v=6B7IF6GOu7s)

		"	vec2 distortedUv = texture2D( tDudv, vec2( vUv.x + time * waveSpeed, vUv.y ) ).rg * waveStrength;",
		"	distortedUv = vUv.xy + vec2( distortedUv.x, distortedUv.y + time * waveSpeed );",
		"	vec2 distortion = ( texture2D( tDudv, distortedUv ).rg * 2.0 - 1.0 ) * waveStrength;",

		// new uv coords

		" vec4 uv = vec4( vUvRefraction );",
		" uv.xy += distortion;",

		"	vec4 base = texture2DProj( tDiffuse, uv );",

		"	gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );",

		"}"

	].join( "\n" )
};
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      seaMaterial: null,
      geometry: null,
      mesh: null,
      container: null,
      spheres : []
    };
  },
  methods: {
    init() {
      this.container = document.getElementById("container");
      this.camera = new THREE.PerspectiveCamera(
        20,
        window.innerWidth / window.innerHeight,
        1,
        3000
      );
      this.camera.position.set(0, 0, 1000);
      this.camera.lookAt(0, 0, 0);
      this.scene = new THREE.Scene();
      this.scene.background  = new THREE.TextureLoader()
          .setPath( './static/' )
          .load('city.jpg');
          
      let textureCube = new THREE.CubeTextureLoader()
					.setPath( 'static/' )
					.load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );

      let axesHelper = new THREE.AxesHelper(150);

      this.scene.add(axesHelper);
      var light1 = new THREE.DirectionalLight( 0xffffff, 1 );
				light1.position.set( 0, 0, 10000 );

      // this.scene.add( light1 );
      let material = new THREE.MeshPhongMaterial( { color: 0xffffff,env:this.scene.background,  refractionRatio: 0.98 } );
      let geometry = new THREE.SphereBufferGeometry( 2, 8, 16 );
      for ( let i = 0; i < 50; i ++ ) {
					let mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = Math.random() * 600-300;
					mesh.position.y = Math.random() * 400-200;
					mesh.position.z = Math.random() * 100;
          mesh.scale.x = mesh.scale.y = mesh.scale.z =2;
					this.scene.add( mesh );

					this.spheres.push( mesh );

        }
        console.log(1)
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