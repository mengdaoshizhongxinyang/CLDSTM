<template>
  <div id="container">

  </div>
</template>

<script>
import * as THREE from "three"
			var container, stats;

			var camera, scene, renderer;

			var raycaster, mouse;

			var mesh, line;
			var t=1
			init();
			animate();

			function init() {

				container = document.getElementById( 'container' );

				//

				camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 3000 );
				camera.position.z=1600

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );
				// scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

				//
				
				scene.add( new THREE.AmbientLight( 0x444444 ) );
				var axesHelper = new THREE.AxesHelper( 150 );
				// 和网格模型Mesh一样，AxesHelper你也可以理解为一个模型对象，需要插入到场景中
				scene.add( axesHelper );
				var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
				light1.position.set( 0, 0, 90 );
				scene.add( light1 );
				var spotLight = new THREE.SpotLight( 0xffffff, 0.6 );
				spotLight.position.set( 840, 400, 360 );
				spotLight.angle = 0.34;
				spotLight.penumbra = 0.1;
				spotLight.decay = 0;
				spotLight.distance = 300;

				scene.add( spotLight );
				var spotLight2 = new THREE.SpotLight( 0xffffff, 0.6 );
				spotLight2.position.set( -840, -400, 360 );
				spotLight2.angle = 0.34;
				spotLight2.penumbra = 0.1;
				spotLight2.decay = 0;
				spotLight2.distance = 300;


				scene.add( spotLight2 );
				// var light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
				// light2.position.set( 0, - 1, 0 );
				// scene.add( light2 );
				var lightHelper1 = new THREE.SpotLightHelper( spotLight );
				scene.add( lightHelper1 );
				//

				var triangles = 5000;

				var geometry = new THREE.BufferGeometry();

				var positions = new Float32Array( 96*3*3 );
				var normals = new Float32Array( triangles * 3 * 3 );
				var colors = new Float32Array( triangles * 3 * 3 );
				var points=[[],[],[],[],[],[],[]];
				var color = new THREE.Color();

				var n = 800, n2 = n / 2;	// triangles spread in the cube
				var d = 300, d2 = d / 2;	// individual triangle size

				var pA = new THREE.Vector3();
				var pB = new THREE.Vector3();
				var pC = new THREE.Vector3();
				
				var cb = new THREE.Vector3();
				var ab = new THREE.Vector3();
				for(var i=0;i<63;i++)
				{
						var x = (i%9)*170-680;
						
						var y = (Math.floor(i/9))*100-300;
						
						var z = d*Math.random();
						// var z=0
						points[Math.floor(i/9)].push([x,y,z])
				}
				var c=0;
				for(var i=0;i<6;i++){
					for(var j=0;j<8;j++){
						positions[ c*18 ]=points[i][j][0]+1
						positions[ c*18+1 ]=points[i][j][1]+1
						positions[ c*18+2 ]=points[i][j][2]

						positions[ c*18+3 ]=points[i][j+1][0]-2
						positions[ c*18+4 ]=points[i][j+1][1]+1
						positions[ c*18+5 ]=points[i][j+1][2]

						positions[ c*18+6 ]=points[i+1][j][0]+1
						positions[ c*18+7 ]=points[i+1][j][1]-2
						positions[ c*18+8 ]=points[i+1][j][2]

						positions[ c*18+9 ]=points[i+1][j+1][0]-1
						positions[ c*18+10 ]=points[i+1][j+1][1]-1
						positions[ c*18+11 ]=points[i+1][j+1][2]

						positions[ c*18+12 ]=points[i][j+1][0]-1
						positions[ c*18+13 ]=points[i][j+1][1]+2
						positions[ c*18+14 ]=points[i][j+1][2]

						positions[ c*18+15 ]=points[i+1][j][0]+2
						positions[ c*18+16 ]=points[i+1][j][1]-1
						positions[ c*18+17 ]=points[i+1][j][2]
						c++
					}
					
				}

				for ( var i = 0; i < positions.length; i += 9 ) {

					var ax=positions[ i ]
					var ay = positions[ i + 1 ];
					var az =positions[ i + 2 ];

					var bx=positions[ i + 3 ] ;
					var by=positions[ i + 4 ] ;
					var bz=positions[ i + 5 ] ;

					var cx=positions[ i + 6 ] ;
					var cy=positions[ i + 7 ] ;
					var cz=positions[ i + 8 ] ;

					// flat face normals

					pA.set( ax, ay, az );
					pB.set( bx, by, bz );
					pC.set( cx, cy, cz );

					cb.subVectors( pC, pB );
					ab.subVectors( pA, pB );
					cb.cross( ab );

					cb.normalize();

					var nx = cb.x;
					var ny = cb.y;
					var nz = cb.z;

					normals[ i ] = nx;
					normals[ i + 1 ] = ny;
					normals[ i + 2 ] = nz;

					normals[ i + 3 ] = nx;
					normals[ i + 4 ] = ny;
					normals[ i + 5 ] = nz;

					normals[ i + 6 ] = nx;
					normals[ i + 7 ] = ny;
					normals[ i + 8 ] = nz;

					// colors

					var vx = ( (ax+680) / 680 );
					var vy = ( (ay+300) / 300 );
					var vz = ( z / n ) + 0.5;
					console.log(vx,vy,vz)
					color.setRGB( (vx-vy)+1.2, 1.5, 2);

					colors[ i ] = color.r;
					colors[ i + 1 ] = color.g;
					colors[ i + 2 ] = color.b;

					colors[ i + 3 ] = color.r;
					colors[ i + 4 ] = color.g;
					colors[ i + 5 ] = color.b;

					colors[ i + 6 ] = color.r;
					colors[ i + 7 ] = color.g;
					colors[ i + 8 ] = color.b;

				}

				geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
				geometry.setAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
				geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

				geometry.computeBoundingSphere();

				// var material = new THREE.MeshPhongMaterial( {
				// 	color: 0x828282, shininess: 50,
				// 	side: THREE.DoubleSide,vertexColors: true
				// } );
					var material = new THREE.MeshLambertMaterial({
						color:0x66a3ff, specular: 0xaaaaaa,side: THREE.DoubleSide,vertexColors: true
					})
				mesh = new THREE.Mesh( geometry, material );
				mesh.geometry.verticesNeedUpdate = true;
				scene.add( mesh );

				//

				raycaster = new THREE.Raycaster();

				mouse = new THREE.Vector2();

				var geometry = new THREE.BufferGeometry();
				geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 4 * 3 ), 3 ) );

				// var material = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true } );

				line = new THREE.Line( geometry, material );
				scene.add( line );

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

			}



			//

			function animate() {

				requestAnimationFrame( animate );
				
				render();

			}

			function render() {
				t++;
				var points=[[],[],[],[],[],[],[]];
				if(mesh){
				// mesh.instanceMatrix.needsUpdate = true;
				raycaster.setFromCamera( mouse, camera );
				var positions=mesh.geometry.attributes.position.array
				for(var i=0;i<63;i++)
				{
						var x = (i%9)*170-680;
						
						var y = (Math.floor(i/9))*100-300;
						
						var z = Math.sin(t/65+i%9+(i/9)*(i/9)*(i/9))*100;
						// var z=0
						points[Math.floor(i/9)].push([x,y,z])
				}
				var c=0;
				for(var i=0;i<6;i++){
					for(var j=0;j<8;j++){
						positions[ c*18 ]=points[i][j][0]+1
						positions[ c*18+1 ]=points[i][j][1]+1
						positions[ c*18+2 ]=points[i][j][2]

						positions[ c*18+3 ]=points[i][j+1][0]-2
						positions[ c*18+4 ]=points[i][j+1][1]+1
						positions[ c*18+5 ]=points[i][j+1][2]

						positions[ c*18+6 ]=points[i+1][j][0]+1
						positions[ c*18+7 ]=points[i+1][j][1]-2
						positions[ c*18+8 ]=points[i+1][j][2]

						positions[ c*18+9 ]=points[i+1][j+1][0]-1
						positions[ c*18+10 ]=points[i+1][j+1][1]-1
						positions[ c*18+11 ]=points[i+1][j+1][2]

						positions[ c*18+12 ]=points[i][j+1][0]-1
						positions[ c*18+13 ]=points[i][j+1][1]+2
						positions[ c*18+14 ]=points[i][j+1][2]

						positions[ c*18+15 ]=points[i+1][j][0]+2
						positions[ c*18+16 ]=points[i+1][j][1]-1
						positions[ c*18+17 ]=points[i+1][j][2]
						c++
					}
				}
						

					mesh.geometry.attributes.position.needsUpdate=true
									
				}
				renderer.render( scene, camera );

			}

  export default {
    
  }
</script>

<style lang="less" scoped>

</style>