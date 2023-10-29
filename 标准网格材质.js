import { scene } from './utils/init'
import * as THREE from 'three'
// 目标：基础网格材质-颜色贴图
// 步骤：
// 1. 创建几何图形
// 2. 定义纹理对象（图片）
// 3. 创建网格材质，装入纹理
// 4. 生成物体加入到场景中

// 目标：基础网格材质-透明度贴图
// 作用：让物体某些部分透明
// 原理：借助透明度贴图（黑色部分：完全透明，白色部分：完全不透明）-> 用颜色计算像素点透明度，因为黑色是 0
// 注意：材质需要开启 transparent 属性
// 与 opacity 区别：
//  透明度贴图部分透明
//  opactity 全都透明
// 步骤：
// 1. 创建透明度贴图纹理对象
// 2. 传入透明纹理对象
// 3. 开启透明材质


// 目标：基础网格材质-环境遮挡贴图
// 作用：让物体有亮暗的对比，更真实
// 原理：黑色部分挡住光线（更暗），白色部分（更亮）
// 步骤：
// 1. 创建纹理对象，加载贴图
// 2. 赋予给材质 aoMap 属性
function createCube () {
  const geometry = new THREE.SphereGeometry(1, 32, 16)
  const textureLoader = new THREE.TextureLoader()
  // 颜色贴图
  const texture = textureLoader.load('texture/one/basecolor.jpg')
  texture.colorSpace = THREE.SRGBColorSpace

  // 透明度贴图
  const alphaTexture = textureLoader.load('texture/one/opacity.jpg')
  alphaTexture.colorSpace = THREE.SRGBColorSpace

  // 环境遮挡贴图
  const aoTexture = textureLoader.load('texture/one/ambientOcclusion.jpg')
  aoTexture.colorSpace = THREE.SRGBColorSpace

  // 粗粗度的贴图
  const roughnessTexture = textureLoader.load('texture/one/roughness.jpg')
  roughnessTexture.colorSpace = THREE.SRGBColorSpace

  // 金属度的贴图
  const metalnessTexture = textureLoader.load('texture/one/metalness.jpg')
  metalnessTexture.colorSpace = THREE.SRGBColorSpace
  // 位移贴图 可以让物体有凹凸效果展示
  const displacementTexture = textureLoader.load('texture/one/displace_height.jpg')
  displacementTexture.colorSpace = THREE.SRGBColorSpace
  // 法线贴图
  const normalTexture = textureLoader.load('texture/one/normal.jpg')
  normalTexture.colorSpace = THREE.SRGBColorSpace
  // 法线是垂直于每个像素点的向量，设置法线可以影响光的反射角度
  // 粗糙度影响某个像素点，漫反射还是镜面反射，而金属度影响镜面反射的强度光泽度
  // 立即使用纹理进行材质创建
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    // alphaMap: alphaTexture, // 2. 传入透明纹理对象
    // transparent: true, // 3. 开启透明材质
    // aoMap: aoTexture, // 2. 设置环境遮挡贴图
    // opacity: 0.1 // 全透明，透明度贴图部分透明
    // shininess: 100, // 光照亮度
    roughness: 1, // 粗糙度设置（0 光滑， 1 粗糙）
    roughnessMap: roughnessTexture, // 同时设置时，上个属性建议为 1
    metalness: 1, // 金属度（光反射的光泽程度，1 是最高）
    metalnessMap: metalnessTexture, // 金属度贴图
    displacementMap: displacementTexture, // 位移贴图
    displacementScale: 1, // 位移范围（0-1）
    normalMap: normalTexture, // 法线贴图（影响光照）
  })
  const circle = new THREE.Mesh(geometry, material)
  // circle.geometry.setAttribute('uv2', new THREE.BufferAttribute(circle.geometry.attributes.uv.array, 2))
  scene.add(circle)
}
function createLight () {
  // 环境光：无方向，照亮场景中所有受光照影响的物体
  const light = new THREE.AmbientLight(0xffffff, 2) // 柔和的白光
  scene.add(light)
  // 从上方照射的白色平行光，强度为 0.5。
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  directionalLight.position.set(3, 2, 2)
  scene.add(directionalLight)
  const helper = new THREE.DirectionalLightHelper(directionalLight, 1)
  scene.add(helper)
}


createCube()
createLight()