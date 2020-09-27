export const Weights = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
    ];

export const Types = ["spades", "hearts", "diamonds", "clubs"];

export class Card {
	mapTextToSign = {
		hearts: '&hearts;',
		spades: '&spades;',
		diamonds: '&diams;',
		clubs: '&clubs;'
	};
	constructor(weight, type, color, cardIndex) {
		this.weight = weight;
		this.type = type;
		this.color = color;
		this.cardIndex = cardIndex;
	}
	render(card, site) {
		const cardDIV = document.createElement('div');
		cardDIV.className = `card ${site} ${card.color}`;
		cardDIV.innerHTML = site === 'cardFront' ? `${card.weight} ${this.mapTextToSign[card.type]}` : '';
		return cardDIV;
	};
	countTop(stack, start) {
		const stackNo = stack.stackNo;
		let divy = document.querySelector(`#subStack_${stackNo}`).childNodes;
		let opened = [];
		let covered = [];
		let spaceCover = 7;
		let spaceOpen = 25;
		if (window.screen.width >= 568) {
			spaceOpen = 18;
		} 
		if (window.screen.width >= 667) {
			spaceOpen = 22;
		}
		if (window.screen.width >= 1024) {
			spaceCover = 15;
			spaceOpen = 30;
		}
		if (window.screen.width >= 1366) {
			spaceCover = 20;
			spaceOpen = 45;
		}		
		if (window.screen.width >= 1440) {
			spaceCover = 10;
			spaceOpen = 25;
		}	
		divy.forEach( div => {
			if (div.className.includes("cardFront")) {
				opened.push(div)	
			} else if (div.className.includes("cardBackward")) {
				covered.push(div)	
			}
		});
		return start === 'start' ? divy.length * spaceCover : (covered.length+1) * spaceCover + opened.length * spaceOpen;
	}
}

const card = new Card();

export default card;