import { scene, camera } from './utils/init'
import * as THREE from 'three'

// 目标：使用环境光+标准网格材质，创建一个平面模拟地面效果
// 1. 创建平面缓冲几何体
// 2. 创建环境光
// 注意1：没有方向，不能投射阴影，只能照亮物体，没有光斑
// 注意2：金属度1，粗糙度0，无环境贴图，放射颜色为黑色，物体自身为黑色并不是灯光的问题
// 环境光：没有方向，不能投射阴影，只能照亮物体，但是没有光斑
// 聚光灯：从一个点沿一个方向射出，距离越远，光锥尺寸越大，模拟手电筒/舞台聚光灯
function createFloor () {
  // 1. 创建平面缓冲几何体
  const geometry = new THREE.PlaneGeometry(10, 10)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  })
  const plane = new THREE.Mesh(geometry, material)
  plane.rotation.set(- Math.PI / 2, 0, 0)
  scene.add(plane)
}
function createLight () {
  // 2. 创建环境光
  // const light = new THREE.AmbientLight(0xffffff, 1)
  // scene.add(light)
  // 点光源：从一个点向各个方向发射的光源。模拟灯泡发出的光。有方向可投射阴影和光斑
  // const light = new THREE.PointLight(0xffffff, 1, 100)
  // light.position.set(3, 3, 3)
  // scene.add(light)

  // const pointLightHelper = new THREE.PointLightHelper(light, 1)
  // scene.add(pointLightHelper)
  // 平行光（太阳）
  // 平行光：沿着特定方向发射的光线。模拟太阳光，太阳足够远，因为我们认为太阳光是平行的，
  // 均匀照亮物体，有光斑（前提是被照射的物体有高光材质设置）
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  // directionalLight.position.set(3, 3, 3)
  // scene.add(directionalLight)

  // const helper = new THREE.DirectionalLightHelper(directionalLight, 1)
  // scene.add(helper)
  // 聚光灯（手电）
  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(3, 3, 3)
  // 灯光的纹理（会把图片和聚光灯颜色混合后打在目标物体上）
  spotLight.map = new THREE.TextureLoader().load('image/desert.jpg')
  scene.add(spotLight)

  const spotLightHelper = new THREE.SpotLightHelper(spotLight)
  scene.add(spotLightHelper)
}

camera.position.set(5, 5, 5)
createFloor()
createLight()