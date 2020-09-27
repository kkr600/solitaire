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
		divy.forEach( div => {
			if (div.className.includes("cardFront")) {
				opened.push(div)	
			} else if (div.className.includes("cardBackward")) {
				covered.push(div)	
			}
		});
		return start === 'start' ? divy.length * 10 : (covered.length+1) * 10 + opened.length * 25;
	}
}

const card = new Card();

export default card;