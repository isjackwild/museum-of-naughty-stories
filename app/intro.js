const TweenLite = require('gsap');
import PubSub from 'pubsub-js';

const shim = document.getElementsByClassName('shim')[0];
const loadingView = document.getElementsByClassName('content-frame--loading')[0];
const welcome = document.getElementsByClassName('content-frame--welcome')[0];
const welcomeContent = welcome.getElementsByTagName('span');


const instructions = document.getElementsByClassName('content-frame--instructions')[0];
const instructionsContent = instructions.getElementsByTagName('span');
const gotItButton = document.getElementsByClassName('button--got-it')[0];

let tl = null;
const STAGGER = 0.06;
const STAGGER_LONG = 0.1;

export const startIntro = () => {
	tl = new TimelineLite({ delay: 1 });
	tl.set(welcome, {
		opacity: 1,
		y: 12,
	});
	tl.staggerFromTo(welcomeContent, 1, {
		y: window.innerHeight,
	}, {
		y: 0,
		ease: Power3.easeOut,
	},
	STAGGER_LONG);
	tl.to(welcome, 2.2, {
		y: -5,
		ease: Power0.easeNone
	},
	"-=0.2");
	tl.staggerTo(welcomeContent, 0.43, {
		y: window.innerHeight * -1,
		ease: Power2.easeIn,
	},
	STAGGER_LONG,
	"-=0.2");
	tl.set(welcome, {
		opacity: 0,
	});
	tl.set(instructions, {
		opacity: 1,
	});
	tl.staggerFromTo(instructionsContent, 1, {
		y: window.innerHeight,
	}, {
		y: 0,
		ease: Power3.easeOut,
		onComplete: () => { gotItButton.addEventListener('click', () => {tl.resume() })},
	},
	STAGGER);
	tl.addPause();
	tl.staggerTo(instructionsContent, 0.33, {
		y: window.innerHeight * -1,
		ease: Power2.easeIn,
	},
	STAGGER);
	tl.to(shim, 0.9, {
		opacity: 0,
		onComplete: () => { PubSub.publish('intro.complete') },
	},
	"-=0.4");
}