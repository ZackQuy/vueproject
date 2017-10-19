

window.THREE = require('assets/js/three/build/three');
require('assets/js/three/examples/js/controls/OrbitControls');


const loginScene = () => {

  /**
   * [createPlane description]
   * @param  {object} props [通过传入props配置size, color, rotation, postion]
   * @return {object} plane [description]
   */
  const createPlane = (props) => {
    let planeGeometry = new THREE.PlaneGeometry(...props.size);
    let planeMaterial = new THREE.MeshLambertMaterial(props.matOpt)
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.set(...props.rotation);
    plane.position.set(...props.position);
    return plane;
  }

  const createBox = (props) => {
    let boxGeometry = new THREE.BoxGeometry(...props.size);
    let boxMaterial = new THREE.MeshPhongMaterial(props.matOpt);
    let box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.castShadow = true;
    box.receiveShadow = false;
    box.rotation.set(...props.rotation);
    box.position.set(...props.position);
    return box;
  }



  let target_dom = document.querySelector('#login_3d_scene');
  let scene_width = target_dom.offsetWidth;
  let scene_height = target_dom.offsetHeight;
  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(scene_width, scene_height);
  renderer.setClearColor(0x000000);

  // 辅助坐标线
  let axes = new THREE.AxisHelper(80);
  scene.add(axes);

  let ambientLight = new THREE.AmbientLight(0xc0c0c0);
  scene.add(ambientLight)


  let spotLight = new THREE.SpotLight(0xffffff);
  console.log();
  spotLight.position.set(100, 100, 100);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 2;
  spotLight.shadow.camera.far = 200;
  spotLight.shadow.camera.fov = 2;
  let spotLightTarget = new THREE.Object3D();
  spotLightTarget.position.set(0, 0, 0);
  spotLight.target = spotLightTarget;
  spotLight.distance = 1000;
  spotLight.angle = 0.5;
  scene.add(spotLight);



  // 相机位置设置
  let camera = new THREE.PerspectiveCamera(40, scene_width / scene_height, 1, 1000);
  camera.position.set(0, 100, 200);
  camera.lookAt(new THREE.Vector3(100, 0, 0));

  let spotLightHelper = new THREE.CameraHelper(camera);
  scene.add(spotLightHelper);


  let backBoard = createPlane({
    size: [300, 100, 1, 1],
    matOpt: {
      color: 0xf08080,
      side: 2
    },
    rotation: [0, 0, 0],
    position: [0, 50, 0]
  });
  scene.add(backBoard);

  let floor = createPlane({
    size: [300, 100, 1, 1],
    matOpt: {
      color: 0xc0c0c0,
      side: 2
    },
    rotation: [Math.PI / 2, 0, 0],
    position: [0, 0, 50]
  });
  scene.add(floor);



  let orbit = new THREE.OrbitControls(camera, renderer.domElement);

  // DOM初始化, 添加场景
  target_dom.appendChild(renderer.domElement);

  // renderer.render(scene, camera);

  const animate = () => {
    requestAnimationFrame(animate);
    orbit.update();
    renderer.render(scene, camera);
  }

  animate();








}

export {
  loginScene
}
