import { scene } from './utils/init'
import * as THREE from 'three'

// 目标：立方体类 MyCube 的创建与应用
// 1. 定义 MyCube 类以及属性和方法
// 2. 循环创建 5 个立方体并出现在三维空间中

class MyCube {
  // 场景参数
  constructor(scene) {
    this.color = new THREE.Color(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
    this.position = [Math.floor(Math.random() * (5 - 0 + 1) + 1), Math.floor(Math.random() * (5 - 0 + 1) + 0), Math.floor(Math.random() * (5 - 0 + 1) + 0)]
    this.size = [Math.floor(Math.random() * (3 - 1 + 1) + 1), Math.floor(Math.random() * (3 - 1 + 1) + 1), Math.floor(Math.random() * (3 - 1 + 1) + 1)]
    this.scene = scene
    this.init() // 在 new 的时候直接创建立方体
    this.rotate()
  }
  init () {
    const geometry = new THREE.BoxGeometry(...this.size)
    const material = new THREE.MeshBasicMaterial({ color: this.color })
    const cube = new THREE.Mesh(geometry, material)
    this.model = cube // 为了以后在别的方法里可以访问到这个 mesh 物体（颜色修改/旋转操控）
    cube.position.set(...this.position)
    this.scene.add(cube)
  }
  randColor () {
    this.model.material.color = new THREE.Color(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
  }
  rotate () {
    this.model.rotation.set(0, Math.PI / 4, 0)
  }
}
// 2. 循环创建 5 个立方体并出现在三维空间中
const arr = [] // 装入我们自己的立方体对象
for (let i = 0; i < 5; i++) {
  arr.push(new MyCube(scene))
}
// 测试：双击修改颜色
window.addEventListener('dblclick', () => {
  arr.forEach(cube => {
    cube.randColor() // 调用自己类中的方法
  })
})