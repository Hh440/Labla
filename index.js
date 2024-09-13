import * as THREE from "three"

import {OrbitControls} from 'jsm/controls/OrbitControls.js'


const w= window.innerWidth;
const h= window.innerHeight;
const renderer= new THREE.WebGLRenderer({
    antialias:true
})

renderer.setSize(w,h)

document.body.appendChild(renderer.domElement)

const fov=75
const  aspect= w/h
const near=0.1
const far=10

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

camera.position.z=2
const  scene = new THREE.Scene();

const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true
controls.dampingFactor=0.03


const geo = new THREE.IcosahedronGeometry(1.0,2)
const mat= new THREE.MeshStandardMaterial({
    color:0xffffff,
    flatShading:true
})

const mesh= new THREE.Mesh(geo,mat)

const hemiLight= new THREE.HemisphereLight(0xffffff,0x000000)
scene.add(hemiLight)

scene.add(mesh);

const wireMat= new THREE.MeshBasicMaterial({
    color:0xffffff,
    wireframe:true
})

const WireMesh= new THREE.Mesh(geo,wireMat)
WireMesh.scale.setScalar(1.001)

mesh.add(WireMesh)

function animate(t){
    requestAnimationFrame(animate)
    mesh.rotation.y=t*0.0001


    renderer.render(scene,camera)
    controls.update()
}

animate()




