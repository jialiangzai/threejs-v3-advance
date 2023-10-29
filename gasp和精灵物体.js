import { scene, camera, renderer } from './utils/init'
import * as THREE from 'three'
// 1. 下载并引入 gsap 动画库
import gsap from 'gsap'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

// 目标：借助 gsap 动画库实现球体缓冲往复位移
// 使用：
// 1. 下载并引入 gsap 动画库
// 2. 使用 gsap.to() 设置动画
// 3. 根据文档调整相关效果
let meshObj
let anObj
let helper
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
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(3, 3, 3)
  directionalLight.castShadow = true
  directionalLight.target = meshObj
  scene.add(directionalLight)

  helper = new THREE.DirectionalLightHelper(directionalLight, 1)
  scene.add(helper)

  // 聚光灯（手电）
  // const spotLight = new THREE.SpotLight(0xffffff, 1);
  // spotLight.position.set(13, 13, 13);
  // // spotLight.map = new THREE.TextureLoader().load('image/desert.jpg');

  // spotLight.castShadow = true

  // spotLight.shadow.mapSize.width = 2048;
  // spotLight.shadow.mapSize.height = 2048;

  // scene.add(spotLight)

  // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);
}
function createSphere () {
  const geometry = new THREE.SphereGeometry(1, 32, 16)
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00
  })
  meshObj = new THREE.Mesh(geometry, material)
  meshObj.position.set(0, 1, 0)
  meshObj.castShadow = true
  scene.add(meshObj)
}
function initAnimation () {
  anObj = gsap.to(meshObj.position, {
    x: 5, // 对参数 1 目标对象做什么属性的变化
    duration: 3, // 动画持续时间
    delay: 2, // 延迟 2 秒后在做当前动画
    repeat: -1, // 无限次反复运动
    yoyo: true, // 回到原点过程也有一个动画
    ease: "expo.out", // 设置缓冲效果（参考： https://greensock.com/docs/v3/Eases）调整使用的内置字符串模式
    onStart () {
      console.log('开始动画')
    },
    onUpdate () {
      // console.log('动画更新')
      helper.update() // 让平行光辅助对象可以实时更新角度和射线
    },
    onComplete () {
      console.log('动画结束')
    }
  })
  window.addEventListener('dblclick', () => {
    if (anObj.isActive()) {
      // 当前动画运行中为 true
      anObj.pause()
    } else {
      // 暂停->恢复
      anObj.resume()
    }
  })
}
function create2d () {
  const div = document.createElement('div')
  div.innerHTML = '球体'
  div.style.color = 'red'
  div.style.fontSize = '32px'
  // 与 CSS3D 区别：2D 物体 px 像素单位还可以生效，而不是平移到三维空间中的单位

  const object2d = new CSS2DObject(div)
  object2d.position.set(0, 3, 0)
  scene.add(object2d)
}
// 精灵物体：始终面向摄像机，  场景缩放时跟随着变大/变小，被模型遮挡，  通过光射投影交互
function createSprite () {
  const texture = (new THREE.TextureLoader()).load('image/pkq.jpg')
  const material = new THREE.SpriteMaterial({ map: texture })

  const sprite = new THREE.Sprite(material)
  sprite.position.set(3, 0.5, -3)
  scene.add(sprite)
}
camera.position.set(5, 5, 5)
renderer.shadowMap.enabled = true
createFloor()
createSphere()
createLight()
create2d()
createSprite()
initAnimation()