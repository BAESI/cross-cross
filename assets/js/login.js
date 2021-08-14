const canvas = document.getElementById('login-bg');
const ctx = canvas.getContext('2d');
const viewPorts = {
	width: window.innerWidth,
	height: window.innerHeight
};
// const colorSet = ['#97c11e', '#fdce8f', '#8cd2f2'];'
const colorSet = ['#97c11e', '#8cd2f2'];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numberOfParticle = 300;
const mouse = {
	x: 0,
	y: 0
};

const letters = document.getElementsByTagName('g');

window.addEventListener('mousemove', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});
class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = Math.random() * 8 + 1;
		this.weight = 2;
		this.directionX = -2;
		// this.color = colorSet[Math.floor(Math.random() * 3)];
		this.color = colorSet[Math.floor(Math.random() * 2)];
	}
	update() {
		if (this.y > canvas.height) {
			this.y = 0 - this.size;
			CustomElementRegistry.weight = 2;
			this.x = Math.random() * canvas.width * 1.2;
			this.weight = 2;
		}
		this.weight += 0.015;
		this.y += this.weight;
		this.x += this.directionX;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
}
const init = () => {
	for (let i = 0; i < numberOfParticle; i++) {
		const x = Math.random() * canvas.width;
		const y = Math.random() * canvas.height;
		particlesArray.push(new Particle(x, y));
	}
};

init();
const animate = () => {
	ctx.fillStyle = 'rgba(255,255,255,0.1)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
		particlesArray[i].draw();
	}
	requestAnimationFrame(animate);
};

setTimeout(animate, 1000);
