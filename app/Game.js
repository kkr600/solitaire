import { DeckCovered } from './DeckCovered.js';
import { MainStacks } from './MainStacks.js';
import { SubStacks } from './SubStacks.js';
import { DeckOpened } from './DeckOpened.js';

class Game {

    activePosition = "";
    activeCard = "";

    start() {
        this.deckCovered = new DeckCovered();
        this.deckCovered.shuffle();
        this.deckOpened = new DeckOpened();
        this.subStack_1 = new SubStacks(1);
        this.subStack_2 = new SubStacks(2);
        this.subStack_3 = new SubStacks(3);
        this.subStack_4 = new SubStacks(4);
        this.subStack_5 = new SubStacks(5);
        this.subStack_6 = new SubStacks(6);
        this.subStack_7 = new SubStacks(7);

        this.subStack_1.add(this.deckCovered.takeCards(this.subStack_1.startStack), 1);
        this.subStack_2.add(this.deckCovered.takeCards(this.subStack_2.startStack), 2);
        this.subStack_3.add(this.deckCovered.takeCards(this.subStack_3.startStack), 3);
        this.subStack_4.add(this.deckCovered.takeCards(this.subStack_4.startStack), 4);
        this.subStack_5.add(this.deckCovered.takeCards(this.subStack_5.startStack), 5);
        this.subStack_6.add(this.deckCovered.takeCards(this.subStack_6.startStack), 6);
        this.subStack_7.add(this.deckCovered.takeCards(this.subStack_7.startStack), 7);

        document.querySelector("#deckCovered").addEventListener('click', (event) =>{
            if (this.deckCovered.number > 0) {
                this.deckOpened.add(this.deckCovered.takeCards());
                this.activeCard = this.deckOpened.deactivate();
            } else {
                this.deckCovered.add(this.deckOpened.takeAll());
            }
        })

        document.querySelector("#deckOpen").addEventListener('click', () =>{
            if (this.deckOpened.number > 0) {
                this.activeCard = this.deckOpened.activate();
            }

        })


        
    }
    deactivateAll() {
        this.activeCard = this.deckOpened.deactivate();
    }
}

const game = new Game();
game.start();


