import { Deck } from './Deck.js';

class Game {
    start() {
        this.deck = new Deck();
        this.deck.shuffle();
        console.log(this.deck)
    }
}

const game = new Game();
game.start();