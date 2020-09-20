import { Card, Types, Weights } from './Cards.js';

export class DeckCovered {
    cards = [];
    constructor() {
      Types.forEach((type) => Weights.forEach((weight) => this.cards.push(new Card(weight, type))));
      this.number = this.cards.length;
    }
      shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = this.cards[i];
        this.cards[i] = this.cards[j];
              this.cards[j] = temp;
          }
      // this.cards.forEach( card => {
      //   console.log(card);
      // })
      return this.cards;
    }
    add(cards) {
      this.number = this.cards.length;
      if (this.number === 0) {
        document.querySelector("#deckCovered").classList.remove("green");
        document.querySelector("#deckCovered").classList.add("cardBackward");
      }
      cards.forEach( card => {
        this.cards.push(card[0])
      });
      this.number = this.cards.length;
      document.querySelector("#numberCovered").innerHTML = `Kart zakrytych: ${this.number}.`;
    }
    takeCards(toTake) {
      toTake = toTake === undefined ? 1 : toTake;
      let from = this.number - toTake;
      let to = from + toTake;
      let reception = this.cards.splice(from, to);
      this.number = this.cards.length;
      document.querySelector("#numberCovered").innerHTML = `Kart zakrytych: ${this.number}.`;
      if (this.number === 0) {
        document.querySelector("#deckCovered").classList.remove("cardBackward");
        document.querySelector("#deckCovered").classList.add("green");
      }
      return reception;
    }

}

