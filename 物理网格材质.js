import { scene } from './utils/init'
import * as THREE from 'three'
import * as dat from 'dat.gui'
// 目标：环境贴图
// 作用：模拟物体对四周内容的反射效果
// 使用：
// 1. 使用 CubeTextureLoader （立方体纹理加载器）- 6 个面的图片，得到纹理对象
// 2. 设置给物体的 envMap 环境贴图属性
// 3. 借助 GUI 工具，修改物体材质的粗糙度和金属度观察效果

function initBase () {
  const geometry = new THREE.SphereGeometry(1, 32, 16)
  const cubeTL = new THREE.CubeTextureLoader()
  // 环境贴图采用 CubeTextureLoader 构造函数实现，设置 6 张图，代表 6 个方向顺序设置
  const cubeTexture = cubeTL.setPath('image/sky/').load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])
  // 物理网格材质拥有更高级的渲染效果，占用更多性能资源，可以添加一层薄薄的膜，模拟更多效果
  const material = new THREE.MeshPhysicalMaterial({
    envMap: cubeTexture,
    roughness: 0,
    metalness: 1,
    // 1. 设置清漆度（0 - 1）
    clearcoat: 1,
    // 2. 设置清漆度的粗糙度
    clearcoatRoughness: 0
  })

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  // 3. 借助 GUI 工具，修改物体材质的粗糙度和金属度观察效果
  const gui = new dat.GUI()
  gui.add(material, 'roughness', 0, 1, 0.1)
  gui.add(material, 'metalness', 0, 1, 0.1)
  scene.background = cubeTexture
}

function createLight () {
  const light = new THREE.AmbientLight(0xffffff)
  scene.add(light)

  const direction = new THREE.DirectionalLight(0xffffff, 2)
  direction.position.set(3, 3, 3)
  scene.add(direction)

  const helper = new THREE.DirectionalLightHelper(direction, 1)
  scene.add(helper)
}

initBase()
createLight()