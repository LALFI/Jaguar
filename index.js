//   {
//     "imports": {
// "three": "https://unpkg.com/three@0.147.0/build/three.module.js",
// "three/addons/": "https://unpkg.com/three@0.147.0/examples/jsm/",
// "mindar-image-three":"https://cdn.jsdelivr.net/npm/mind-ar@1.2.0/dist/mindar-image-three.prod.js"
//     }
//   }
import * as THREE from "three";
import { MindARThree } from "mindar-image-three";
import { cargarModelo } from "./CargarModelo.js";

let mixers = [];
var clock = new THREE.Clock();

const mindarThree = new MindARThree({
  container: document.querySelector("#container"),
  imageTargetSrc: "./targets/targets_jaguar2.mind", //nombre del archivo
});
const { renderer, scene, camera } = mindarThree;

let iluminador = new THREE.PMREMGenerator(renderer);
iluminador.compileEquirectangularShader();
new THREE.TextureLoader().load("./hdr/fondoRedu.png", function (texture) {
  var texturaCielo = iluminador.fromEquirectangular(texture);
  scene.environment = texturaCielo.texture;
  texture.dispose();
  iluminador.dispose();
});

//--------Aqui agregamos la cantidad necesaria de anclas
const ancla1 = mindarThree.addAnchor(0);
const ancla2 = mindarThree.addAnchor(1);
const ancla2 = mindarThree.addAnchor(2);

//----- Cargamos los modelos
cargarModelo("./modelo/tigreZ2.glb", ancla1, 1.5);
cargarModelo("./modelo/tigreZ2.glb", ancla2, 1.5);
cargarModelo("./modelo/tigreZ2.glb", ancla3, 1.5);

const start = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    if (mixers.length > 0) {
      for (let i = 0; i < mixers.length; i++) {
        mixers[i].update(clock.getDelta());
      }
    }
    renderer.render(scene, camera);
  });
};
start();
