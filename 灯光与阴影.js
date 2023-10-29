import { scene, camera, renderer } from './utils/init'
import * as THREE from 'three'

// 目标：灯光与阴影
// 阴影：模拟物理世界中的阴影效果
// 必要元素：灯光，物体，平面（接收阴影）
// 步骤：
// 1. 渲染器开启阴影支持（性能消耗高）
// 2. 灯光产生阴影
// 3. 物体产生阴影
// 4. 平面接收阴影
// 注意：接收阴影的平面不能是基础材质

function createFloor () {
  const geometry = new THREE.PlaneGeometry(10, 10)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  })
  const plane = new THREE.Mesh(geometry, material)
  plane.rotation.set(- Math.PI / 2, 0, 0)
  plane.receiveShadow = true
  scene.add(plane)
}
function createLight () {
  // 环境光
  // const light = new THREE.AmbientLight(0xffffff, 1)
  // scene.add(light)

  // 点光源（灯泡）
  // const light = new THREE.PointLight(0xffffff, 1, 100);
  // light.position.set(3, 3, 3);
  // scene.add(light);

  // const pointLightHelper = new THREE.PointLightHelper(light, 1);
  // scene.add(pointLightHelper);

  // 平行光（太阳）
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // directionalLight.position.set(3, 3, 3);
  // scene.add(directionalLight);

  // const helper = new THREE.DirectionalLightHelper(directionalLight, 1);
  // scene.add(helper);

  // 聚光灯（手电）
  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(13, 13, 13)
  // spotLight.map = new THREE.TextureLoader().load('image/desert.jpg');

  spotLight.castShadow = true // 灯光产生阴影

  // 让聚光灯打出阴影贴图大小（2 的几次幂值）
  spotLight.shadow.mapSize.width = 2048
  spotLight.shadow.mapSize.height = 2048

  scene.add(spotLight)

  const spotLightHelper = new THREE.SpotLightHelper(spotLight)
  scene.add(spotLightHelper)
}
function createSphere () {
  const geometry = new THREE.SphereGeometry(1, 32, 16)
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 1, 0)
  mesh.castShadow = true // 物体产生阴影（参与阴影计算）
  scene.add(mesh)
}

camera.position.set(5, 5, 5)
renderer.shadowMap.enabled = true // 开启阴影渲染支持
createLight()
createSphere()
createFloor()