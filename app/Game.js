import deckCovered from './DeckCovered.js';
import { MainStacks } from './MainStacks.js';
import { SubStack } from './SubStack.js';
import deckOpened from './DeckOpened.js';
import active from './Active.js';

class Game {
    start() {
        deckCovered.shuffle();
        this.subStack_1 = new SubStack(1);
        this.subStack_2 = new SubStack(2);
        this.subStack_3 = new SubStack(3);
        this.subStack_4 = new SubStack(4);
        this.subStack_5 = new SubStack(5);
        this.subStack_6 = new SubStack(6);
        this.subStack_7 = new SubStack(7);

        this.subStack_1.addStart(deckCovered.takeCards(this.subStack_1.startStack), 1);
        this.subStack_2.addStart(deckCovered.takeCards(this.subStack_2.startStack), 2);
        this.subStack_3.addStart(deckCovered.takeCards(this.subStack_3.startStack), 3);
        this.subStack_4.addStart(deckCovered.takeCards(this.subStack_4.startStack), 4);
        this.subStack_5.addStart(deckCovered.takeCards(this.subStack_5.startStack), 5);
        this.subStack_6.addStart(deckCovered.takeCards(this.subStack_6.startStack), 6);
        this.subStack_7.addStart(deckCovered.takeCards(this.subStack_7.startStack), 7);

        document.querySelector("#deckCovered").addEventListener('click', (event) =>{
            if (active.activeStack.includes("subStack_")) {
                active.clearCardsToMove();
                active.deactivateStack();
            }
            if (deckCovered.number > 0) {
                deckOpened.add(deckCovered.takeCards(1));
                active.setActiveStack("deckCovered");
            } else {
                deckCovered.add(deckOpened.takeAll());
                active.setActiveStack("deckCovered");
            }
        })

        document.querySelector("#deckOpened").addEventListener('click', () =>{
            if (active.activeStack.includes("subStack_")) {
                active.clearCardsToMove();
                active.deactivateStack();
                active.setActiveStack("deckOpened");
                active.setActiveCard(deckOpened.activate())
            } else if (deckOpened.number > 0 && active.activeStack !== "deckOpened") {
                active.setActiveCard(deckOpened.activate());
            } else if (deckOpened.number > 0 && active.activeStack === "deckOpened") {
                active.deactivateStack();
            } 
            
        })
       
    }
    deactivateAll() {
        activeCard = deckOpened.deactivate();
    }
}

const game = new Game();
game.start();