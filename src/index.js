import {Scene, PerspectiveCamera, WebGLRenderer, Color, Vector3,
BufferGeometry, LineBasicMaterial, Line} from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const canvas = document.getElementById("canvas");
canvas.width = canvas.width *  2;
canvas.height = canvas.height * 2;

const renderer = new WebGLRenderer({canvas: canvas, antialias: true, precision: "mediump"});

camera.position.z = 600;

renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new Color('white');

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
let driftX = 1;

let x, y;
function nextPoint(){

    if(xNoise >= MAX_DRIFT || xNoise <= - MAX_DRIFT){
        dx = - dx// (randomNumber(10, 30) / 100)
    }

    if(yNoise >= MAX_DRIFT || yNoise <= - MAX_DRIFT){
        dy = - dy //(randomNumber(10, 30) / 100)
    }
    xNoise += dx;
    yNoise += dy;

    x = Math.sin(counter * .1) * (counter * .1) + xNoise
    y = Math.cos(counter * .1) * (counter * .1) + yNoise

    return new Vector3(x, y, 0);
}

function nextColor(){

    let r = Math.random();

    if(r <= 0.33){
        color = "#bfbfbf";
    } else {
        color = colors.shift();
        colors.push(color);
    }
}

let interval = setInterval(animate, 25);

function animate() {
    counter++;
    let p = nextPoint();
    points.push(p);

    if(points.length >= 5){
        let geometry = new BufferGeometry().setFromPoints(points);
        let material = new LineBasicMaterial({color: color});
        let line = new Line(geometry, material);
        scene.add(line);
        renderer.render(scene, camera);
        points = points.slice(points.length - 1);
    }


    if(counter % 120 === 0){
        nextColor();
        MAX_DRIFT += driftX
        dx *= (1 + .1 * Math.random());
        dy *= (1 + .1 * Math.random());

        if(MAX_DRIFT % 40 === 0){
            driftX = driftX * 2;
        }
    }

    if(Math.abs(x) > 2000 || Math.abs(y) > 2000){
        console.log("finished");
        clearInterval(interval);
    }
}


function randomNumber(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min+1)+min);
}
