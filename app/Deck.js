import { Card, Types, Weights } from './Cards.js';

export class Deck {
    cards = [];
    constructor() {
		Types.forEach((type) => Weights.forEach((weight) => this.cards.push(new Card(weight, type))));
    }
    shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			const temp = this.cards[i];
			this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
		return this.cards;
    }
    takeCards(number) {
        number = number === undefined ? 1 : number;
        let deckCount = this.cards.length;
        let from = deckCount - number;
        let to = from + number;
        let reception = this.cards.splice(from, to);
        console.log(`Zostało ${this.cards.length} kart`)
        return reception;
        
    }
}

