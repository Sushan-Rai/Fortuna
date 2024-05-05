// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { FontLoader } from 'three/addons/loaders/FontLoader.js';
// import * as dat from "dat.gui";

// export function render3dChart(allData) {
//   console.log(allData)

//   const canvas = document.createElement('canvas');
//  canvas.classList.add('webgl');

//  // Append the canvas to the body of the document
//  document.body.appendChild(canvas);

//  // Now you can use this canvas for rendering
//  const renderer = new THREE.WebGLRenderer({
//   alpha:true,
//   canvas: canvas,
//   antialias: true
// });
//   // const canvas = document.querySelector("canvas.webgl");
//   const scene = new THREE.Scene();
//   // const renderer = new THREE.WebGLRenderer({
//   //   alpha: true,
//   //   canvas: canvas,
//   //   antialias: true,
//   // });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   const cameraOffset = 10;
//   let camera = new THREE.OrthographicCamera(
//     -cameraOffset,
//     cameraOffset,
//     cameraOffset,
//     -cameraOffset,
//     1,
//     1000
//   );

//   // Add debug controls
//   const gui = new dat.GUI();

//   scene.add(new THREE.GridHelper(100, 100));
//   camera.position.set(-10, 20, 10);
//   camera.zoom = 1;
//   camera.updateProjectionMatrix();

//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.target.set(0, 11, 0);

//   const allColors = [
//     0xfeffc8, 0xfffec0, 0xfffcb7, 0xfffaaf, 0xfff7a7, 0xfff39f, 0xffef96,
//     0xffeb8e, 0xffe686, 0xffe17e, 0xffdb75, 0xffd56d, 0xffce65, 0xffc75c,
//     0xffc054, 0xffb84c, 0xffaf44, 0xffa63b, 0xff9d33, 0xff932b, 0xff8922,
//     0xff7e1a, 0xff7312, 0xff670a, 0xff5b01, 0xf85100, 0xf04700, 0xe83e00,
//     0xdf3600, 0xd72e00,
//   ];

//   const fontLoader = new FontLoader();
//   const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

//   for (let i = 0; i < allData.length; i++) {
//     const indexData = allData[i];
//     const indexName = indexData.Index;
//     const percentChange = indexData.Values[0].PercentChange;
//     const currentValue = indexData.Values[0].Current;
//     const oneYearAgo = indexData.Values[0].OneYearAgo;

//     const geometry = new THREE.BoxGeometry(1, currentValue / 10000, 1);
//     const cubeMaterial = new THREE.MeshStandardMaterial({
//       color: allColors[i],
//     });

//     const mesh = new THREE.Mesh(geometry, cubeMaterial);
//     scene.add(mesh);
//     mesh.position.set(percentChange, currentValue / 20000, -10 + i / 3);

//     mesh.castShadow = true;
//     mesh.receiveShadow = true;

//     fontLoader.load("fonts/ibm_plex.json", (font) => {
//       const textGeometry = new THREE.TextGeometry(indexName, {
//         font: font,
//         size: 0.15,
//         height: 0.04,
//       });

//       const textMesh = new THREE.Mesh(textGeometry, textMaterial);
//       textMesh.geometry.computeBoundingBox();
//       textMesh.geometry.translate(-textMesh.geometry.boundingBox.max.x, 0, 0);
//       textMesh.rotation.set(-Math.PI / 2, 0, 0);
//       textMesh.position.set(-0.2, 0.1, -10 + i / 3);

//       scene.add(textMesh);
//     });

//     fontLoader.load("fonts/ibm_plex.json", (font) => {
//       const valueFormatted = currentValue.toFixed(2);

//       const textGeometry = new THREE.TextGeometry(valueFormatted, {
//         font: font,
//         size: 0.18,
//         height: 0.01,
//         curveSegments: 1,
//       });

//       const textMesh = new THREE.Mesh(textGeometry, textMaterial);

//       textMesh.position.set(
//         percentChange + 0.5,
//         currentValue / 20000 + 0.5,
//         -10 + i / 3
//       );
//       scene.add(textMesh);
//     });
//   }

//   const spotLight = new THREE.SpotLight(0xffffff, 1);
//   spotLight.position.set(5, 30, 31);

//   const spotLight2 = new THREE.SpotLight(0xffffff, 0.8);
//   spotLight2.position.set(-25, 3, 2);

//   const spotLight3 = new THREE.SpotLight(0xffffff, 0.2);
//   spotLight3.position.set(6, 14, 35);

//   renderer.shadowMap.enabled = true;
//   renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//   spotLight2.castShadow = true;
//   spotLight3.castShadow = true;

//   spotLight3.shadow.mapSize.width = 1024;
//   spotLight3.shadow.mapSize.height = 1024;
//   spotLight.shadow.mapSize.height = 1024;
//   spotLight.shadow.mapSize.width = 1024;
//   spotLight2.shadow.mapSize.height = 1024;
//   spotLight2.shadow.mapSize.width = 1024;

//   scene.add(spotLight);
//   scene.add(spotLight2);
//   scene.add(spotLight3);

//   function animate() {
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
//   }

//   animate();
// }

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import * as dat from "dat.gui";

export function render3dChart(allData) {
  const canvas = document.createElement('canvas');
  canvas.classList.add('webgl');
  document.body.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: canvas,
    antialias: true
  });

  const scene = new THREE.Scene();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const cameraOffset = 10;
  let camera = new THREE.OrthographicCamera(
    -cameraOffset,
    cameraOffset,
    cameraOffset,
    -cameraOffset,
    1,
    1000
  );

  scene.add(new THREE.GridHelper(100, 100));
  camera.position.set(-10, 20, 10);
  camera.zoom = 1;
  camera.updateProjectionMatrix();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 11, 0);

  // const allColors = [
  //   0xfeffc8, 0xfffec0, 0xfffcb7, 0xfffaaf, 0xfff7a7, 0xfff39f, 0xffef96,
  //   0xffeb8e, 0xffe686, 0xffe17e, 0xffdb75, 0xffd56d, 0xffce65, 0xffc75c,
  //   0xffc054, 0xffb84c, 0xffaf44, 0xffa63b, 0xff9d33, 0xff932b, 0xff8922,
  //   0xff7e1a, 0xff7312, 0xff670a, 0xff5b01, 0xf85100, 0xf04700, 0xe83e00,
  //   0xdf3600, 0xd72e00,
  // ];
  const allColors = [
    0xfeffc8, 0xfefec4, 0xfefec1, 0xfffdbe, 0xfffcbb, 0xfffcb7, 0xfffbb4, 0xfffab1, 0xfff9ae, 0xfff8ab,
    0xfff7a8, 0xfff6a5, 0xfff4a2, 0xfff39f, 0xfff19b, 0xfff098, 0xffee95, 0xffed92, 0xffeb8f, 0xffe98c,
    0xffe788, 0xffe585, 0xffe482, 0xffe27f, 0xffe07c, 0xffdd79, 0xffdb75, 0xffd972, 0xffd66f, 0xffd46c,
    0xffd169, 0xffcf66, 0xffcc63, 0xffc95f, 0xffc75c, 0xffc459, 0xffc156, 0xffbf53, 0xffbc50, 0xffb84c,
    0xffb549, 0xffb246, 0xffae43, 0xffab40, 0xffa73c, 0xffa439, 0xffa136, 0xff9d33, 0xff9930, 0xff962d,
    0xff922a, 0xff8e26, 0xff8a23, 0xff8620, 0xff821d, 0xff7e1a, 0xff7917, 0xff7513, 0xff7110, 0xff6c0d,
    0xff680a, 0xff6307, 0xff5f04, 0xfe5a00, 0xfc5600, 0xf95200, 0xf64f00, 0xf34b00, 0xf04700, 0xed4400,
    0xea4000, 0xe73d00, 0xe33a00, 0xe03700, 0xdd3400, 0xda3100, 0xd72e00
];

  const fontLoader = new FontLoader();
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

  for (let i = 0; i < allData.length; i++) {
    const indexData = allData[i];
    const indexName = indexData.index_Names;
    const percentChange = indexData.changePct;
    const currentValue = parseFloat(indexData.current);
    const oneYearAgo = parseFloat(indexData.oneYearAgo);

    const geometry = new THREE.BoxGeometry(1, currentValue / 10000, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: allColors[i],
    });

    const mesh = new THREE.Mesh(geometry, cubeMaterial);
    scene.add(mesh);
    mesh.position.set(percentChange, currentValue / 20000, -10 + i / 3);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    fontLoader.load("fonts/ibm_plex.json", (font) => {
      const textGeometry = new TextGeometry(indexName, {
        font: font,
        size: 0.15,
        depth: 0.04,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.geometry.computeBoundingBox();
      textMesh.geometry.translate(-textMesh.geometry.boundingBox.max.x, 0, 0);
      textMesh.rotation.set(-Math.PI / 2, 0, 0);
      textMesh.position.set(-0.2, 0.1, -10 + i / 3);

      scene.add(textMesh);
    });

    fontLoader.load("fonts/ibm_plex.json", (font) => {
      const valueFormatted = currentValue.toFixed(2);

      const textGeometry = new TextGeometry(valueFormatted, {
        font: font,
        size: 0.18,
        depth: 0.01,
        curveSegments: 1,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      textMesh.position.set(
        percentChange + 0.5,
        currentValue / 20000 + 0.5,
        -10 + i / 3
      );
      scene.add(textMesh);
    });
  }

  const spotLight = new THREE.SpotLight(0xffff00, 1);
  spotLight.position.set(5, 30, 31);

  const spotLight2 = new THREE.SpotLight(0xff00ff, 0.8);
  spotLight2.position.set(-25, 3, 2);

  const spotLight3 = new THREE.SpotLight(0x00ffff, 0.2);
  spotLight3.position.set(6, 14, 35);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  spotLight2.castShadow = true;
  spotLight3.castShadow = true;

  spotLight3.shadow.mapSize.width = 1024;
  spotLight3.shadow.mapSize.height = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.mapSize.width = 1024;
  spotLight2.shadow.mapSize.height = 1024;
  spotLight2.shadow.mapSize.width = 1024;

  scene.add(spotLight);
  scene.add(spotLight2);
  scene.add(spotLight3);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
// }
  // Rest of the code remains the same...
}