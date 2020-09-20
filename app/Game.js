import { Deck } from './Deck.js';
import { MainStacks } from './MainStacks.js';
import { SubStacks } from './SubStacks.js';

class Game {
    start() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.subStack_1 = new SubStacks(1);
        this.subStack_2 = new SubStacks(2);
        this.subStack_3 = new SubStacks(3);
        this.subStack_4 = new SubStacks(4);
        this.subStack_5 = new SubStacks(5);
        this.subStack_6 = new SubStacks(6);
        this.subStack_7 = new SubStacks(7);

        this.subStack_1.add(this.deck.takeCards(this.subStack_1.startStack));
        this.subStack_2.add(this.deck.takeCards(this.subStack_2.startStack));
        this.subStack_3.add(this.deck.takeCards(this.subStack_3.startStack));
        this.subStack_4.add(this.deck.takeCards(this.subStack_4.startStack));
        this.subStack_5.add(this.deck.takeCards(this.subStack_5.startStack));
        this.subStack_6.add(this.deck.takeCards(this.subStack_6.startStack));
        this.subStack_7.add(this.deck.takeCards(this.subStack_7.startStack));

        
    }
}

const game = new Game();
game.start();


