import { scene } from './utils/init'
import * as THREE from 'three'
import * as dat from 'dat.gui'

const gui = new dat.GUI()

// 目标：了解世界坐标器和模型（本地）坐标系
// 世界坐标系：整个场景空间中的中心点
// 模型（本地）坐标系：物体本身的中心点构建

// 作用：
// 物体位移参考的是父级坐标系
// 物体旋转，缩放参考的是本地坐标系

function initBase () {
  // 物体1：绿色立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  scene.add(mesh)

  gui.add(mesh.position, 'x', 0, 3, 0.01).name('位移x')
  gui.add(mesh.position, 'y', 0, 3, 0.01).name('位移y')
  gui.add(mesh.position, 'z', 0, 3, 0.01).name('位移z')

  gui.add(mesh.rotation, 'x', 0, 2 * Math.PI).name('旋转x')
  gui.add(mesh.rotation, 'y', 0, 2 * Math.PI).name('旋转y')
  gui.add(mesh.rotation, 'z', 0, 2 * Math.PI).name('旋转z')

  gui.add(mesh.scale, 'x', 0, 3, 0.01).name('缩放x')
  gui.add(mesh.scale, 'y', 0, 3, 0.01).name('缩放y')
  gui.add(mesh.scale, 'z', 0, 3, 0.01).name('缩放z')

  const helper = new THREE.AxesHelper(2)
  // 某个物体上也可以加坐标系辅助对象
  mesh.add(helper)
}
initBase()
