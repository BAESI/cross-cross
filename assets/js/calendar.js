const target = document.getElementsByClassName('activation')[0];
const appear = document.getElementsByClassName('content-list')[0];

const disappear = document.getElementsByClassName('register-button')[0];

const contents = appear.getElementsByClassName('contents');

console.dir(contents);

let flag = false;

const incomming = (e) => {
	if (!flag) {
		disappear.style.display = 'none';
		appear.style.transform = 'translateX(0)';
		flag = true;
	} else {
		flag = false;
		appear.style.transform = 'translateX(600px)';
		setTimeout(() => (disappear.style.display = 'flex'), 500);
	}
};

target.addEventListener('click', incomming);

for (let i = 0; i < contents.length; i++) {
	console.log(contents[i]);
	contents[i].addEventListener(
		'click',
		(e) => {
			for (let j = 0; j < contents.length; j++) {
				if (contents[j].style.border != '1px solid black') {
					contents[j].style.border = '1px solid black';
				}
			}
			console.log(this);
			if (e.target.className == 'contents') {
				e.target.style.border = '3px solid blue';
			}
			console.dir(e.target);
		},
		false
	);
}
