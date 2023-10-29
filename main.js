import { scene } from './utils/init'
import * as THREE from 'three'

// 目标：立方体类 MyCube 的创建与应用
// 1. 定义 MyCube 类以及属性和方法
// 2. 循环创建 5 个立方体并出现在三维空间中
// 目标：创建 MySphere 类，并创建 5 个球体
// 1. 创建 BaseModel 提取公共属性和方法
// 2. 修改 MyCube 类继承自 BaseModal 类
// 3. 创建 MySphere 类并实例化 5 个球体



class BaseCube {
  constructor(scene) {
    this.scene = scene
    this.model = null
    this.size = null
    this.color = new THREE.Color(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
    this.position = [Math.floor(Math.random() * (5 - 0 + 1) + 1), Math.floor(Math.random() * (5 - 0 + 1) + 0), Math.floor(Math.random() * (5 - 0 + 1) + 0)]
  }
  randColor () {
    this.model.material.color = new THREE.Color(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
  }

}
class MyCube extends BaseCube {
  // 场景参数
  // 如果子类有 constructor，必须在第一行调用 super() 才能触发父类的构造方法并绑定公共属性和方法, super 会把当前锁在函数内 this 值传递给父类构造函数内 this 替换
  constructor(scene) {
    super(scene)
    this.size = [Math.floor(Math.random() * (3 - 1 + 1) + 1), Math.floor(Math.random() * (3 - 1 + 1) + 1), Math.floor(Math.random() * (3 - 1 + 1) + 1)]
    this.init() // 在 new 的时候直接创建立方体
    this.rotate()
  }
  init () {
    const geometry = new THREE.BoxGeometry(...this.size)
    const material = new THREE.MeshBasicMaterial({ color: this.color })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(...this.position)
    this.model = cube // 为了以后在别的方法里可以访问到这个 mesh 物体（颜色修改/旋转操控）
    this.scene.add(cube)
  }
  rotate () {
    this.model.rotation.set(0, Math.PI / 4, 0)
  }
}
class MySphere extends BaseCube {
  // 场景参数
  // 如果子类有 constructor，必须在第一行调用 super() 才能触发父类的构造方法并绑定公共属性和方法, super 会把当前锁在函数内 this 值传递给父类构造函数内 this 替换
  constructor(scene) {
    super(scene)
    this.radius = Math.floor(Math.random() * (2 - 1 + 1) + 1)
    this.init() // 在 new 的时候直接创建立方体
  }
  init () {
    const geometry = new THREE.SphereGeometry(this.radius, 32, 16)
    const material = new THREE.MeshBasicMaterial({ color: this.color })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(...this.position)
    this.model = cube // 为了以后在别的方法里可以访问到这个 mesh 物体（颜色修改/旋转操控）
    this.scene.add(cube)
  }
}
// 2. 循环创建 5 个立方体并出现在三维空间中
// const arr = [] // 装入我们自己的立方体对象
// for (let i = 0; i < 5; i++) {
//   arr.push(new MyCube(scene))
// }
let cubeSp = new MySphere(scene)
// 测试：双击修改颜色
// window.addEventListener('dblclick', () => {
//   arr.forEach(cube => {
//     cube.randColor() // 调用自己类中的方法
//   })
// })
window.addEventListener('dblclick', () => {
  cubeSp.randColor() // 调用自己类中的方法
})