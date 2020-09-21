import { Card, Types, Weights } from './Cards.js';

export class DeckCovered {
    cards = [];
    constructor() {
      Types.forEach((type) => {
        Weights.forEach((weight) => {
          let color = type === "hearts" || type === "diamonds" ? "red" : "black";
          let cardIndex = "";
          switch (weight) {
            case "J":
              cardIndex = 11;
              break;
            case "Q":
              cardIndex = 12;
              break;
            case "K":
              cardIndex = 13;
              break;
            case "A":
              cardIndex = 14;
              break;
            default:
              cardIndex = weight;
          }
          this.cards.push(new Card(weight, type, color, cardIndex))
        });
      })
      this.number = this.cards.length;
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
    }
    takeCards(toTake) {
      let from = this.number - toTake;
      let to = from + toTake;
      let reception = this.cards.splice(from, to);
      this.number = this.cards.length;
      if (this.number === 0) {
        document.querySelector("#deckCovered").classList.remove("cardBackward");
        document.querySelector("#deckCovered").classList.add("green");
      }
      return reception;
    }

}

