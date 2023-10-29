// 初始化 three.js 基础环境
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'

export let scene, camera, renderer, controls, css2dRenderer;

(function init () {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 5)
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  app.appendChild(renderer.domElement)
})();

(function createControls () {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
})();

(function createHelper () {
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)
})();

(function resizeRender () {
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    css2dRenderer.setSize(window.innerWidth, window.innerHeight)
  })
})();



// window.addEventListener('dblclick', () => {
//   camera.position.set(0.47, 1.12, -0.30)
//   // 影响轨道控制器观察的目标位置（聚焦点）->影响摄像机查看的角度
//   controls.target = new THREE.Vector3(0.47, 0.99, 0.06)
// })
//创建 2D 渲染器
(function create2dRenderer () {
  css2dRenderer = new CSS2DRenderer()
  css2dRenderer.setSize(window.innerWidth, window.innerHeight)
  css2dRenderer.domElement.style.position = 'fixed'
  css2dRenderer.domElement.style.left = '0'
  css2dRenderer.domElement.style.top = '0'
  css2dRenderer.domElement.style.pointerEvents = 'none'
  document.body.appendChild(css2dRenderer.domElement)
})();
(function renderLoop () {
  renderer.render(scene, camera)
  controls.update()
  css2dRenderer.render(scene, camera)
  requestAnimationFrame(renderLoop)
})()