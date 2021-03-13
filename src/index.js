// import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, precision: "mediump"});

camera.position.z = 600;

renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color('white');
const white = 0xFFFFFF;  // white
// scene.fog = new THREE.FogExp2(white, 0.0006);
const colors = [
    '#fba4ff',
    '#80bbff',
    '#6bd66b',
    '#bfb856',
    '#e5a96b',
    '#ff918b'];

let points = [];
let color = '';

nextColor();

let counter = 0
let xNoise = 0;//(Math.random() - 0.5) * 5;
let yNoise = 0;// (Math.random() - 0.5) * 5;
let dx = randomNumber(100, 300) / 1000;
let dy = randomNumber(100, 300) / 1000;
let MAX_DRIFT = 6;

console.log(dx, dy);

function nextPoint(){
    // let xNoise = (Math.random() - 0.5) * 10;
    // let yNoise = (Math.random() - 0.5) * 10;

    if(xNoise > MAX_DRIFT || xNoise < - MAX_DRIFT){
        dx = - dx// (randomNumber(10, 30) / 100)
        // console.log("x shift")
    }

    if(yNoise > MAX_DRIFT || yNoise < - MAX_DRIFT){
        dy = - dy //(randomNumber(10, 30) / 100)
        // console.log("y shift")
    }
    // console.log("here", dx, dy);
    xNoise += dx;
    yNoise += dy;
    // let timer = Date.now() * 0.00012;
    // xNoise = Math.sin(timer) * dx;
    // console.log(xNoise)

    return new THREE.Vector3(Math.sin(counter * (Math.PI / 180)) * (counter * .1) + xNoise,
        Math.cos(counter * (Math.PI / 180)) * (counter * .1) + yNoise,
        0) ;
}

function nextColor(){

    let r = Math.random();

    if(r <= 0.5){
        color = "#bfbfbf";
    } else {
        color = colors.shift();
        colors.push(color);
    }


}

function animate() {
    counter++;
    let p = nextPoint();
    points.push(p);

    geometry = new THREE.BufferGeometry().setFromPoints(points);
    material = new THREE.LineBasicMaterial({color: color});
    line = new THREE.Line(geometry, material);
    // scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({color: color})));
    scene.add(line);
    renderer.render(scene, camera);

    if(counter % 120 === 0){
        points = points.slice(points.length - 1);
        nextColor();
    }
    // requestAnimationFrame( animate );
}

setInterval(animate, 15);

function randomNumber(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min+1)+min);
}
