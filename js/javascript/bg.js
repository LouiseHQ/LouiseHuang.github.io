var scene, camera, renderer;
var starGeometry, starMaterial, starMesh;

		function init() {

			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 75, window.outerWidth/window.outerHeight, 1, 10000 );
			camera.position.z = 3;

			var canvas = document.querySelector("canvas");
			renderer = new THREE.WebGLRenderer({canvas: canvas});
			renderer.setSize( window.outerWidth,window.outerHeight);
			document.body.appendChild(renderer.domElement);

			starGeometry = new THREE.SphereGeometry(5, 20, 20);
			var starTexture = new THREE.TextureLoader().load( "images/globe/star_medium.jpg" );
			starMaterial = new THREE.MeshBasicMaterial({map:starTexture});
			starMesh = new THREE.Mesh( starGeometry, starMaterial );
			starMesh.material.side  = THREE.BackSide;
			scene.add(starMesh);
		}

		function animate() {
			requestAnimationFrame(animate);
			render();
		}

		function render(){
			starMesh.rotation.y += 0.0004;
			renderer.render(scene, camera );
			THREEx.WindowResize(renderer, camera);
		}
		init();
		animate();