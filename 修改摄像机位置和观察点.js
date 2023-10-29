import { scene } from './utils/init'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// 模型：包含网格，材质，贴图等信息的集合物体
// 模型文件：分为 .gltf, .glb, .fbx 等等类型
// 使用：借助 three.js 提供的 GLTFLoader 加载器可以加载 .gltf / .glb 模型文件，得到模型对象

function initBase () {
  new GLTFLoader().load('model/ferrari.glb', gltf => {
    // 3. 取出模型对象并添加到场景中
    const model = gltf.scene
    // 遍历物体内部每个小物体组成
    model.traverse(obj => {
      if (obj.name === 'Object_3') {
        obj.material.color = new THREE.Color('#ffdd00')
      }
    })
    scene.add(model)
  })
}

function createLight () {
  const light = new THREE.AmbientLight(0xffffff, 1)
  scene.add(light)
  // 从上方照射的白色平行光，强度为 0.5。
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  directionalLight.position.set(3, 3, 3)
  scene.add(directionalLight)
  const helper = new THREE.DirectionalLightHelper(directionalLight, 5)
  scene.add(helper)
}

initBase()
createLight()