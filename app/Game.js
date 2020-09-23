import deckCovered from './DeckCovered.js';
import { mainStack_1, mainStack_2, mainStack_3, mainStack_4 } from './MainStack.js';
import { subStack_1, subStack_2, subStack_3, subStack_4, subStack_5, subStack_6, subStack_7 } from './SubStack.js';
import deckOpened from './DeckOpened.js';
import active from './Active.js';

class Game {
    start() {
        deckCovered.shuffle();

        subStack_1.addStart(deckCovered.takeCards(subStack_1.stackNo), 1);
        subStack_2.addStart(deckCovered.takeCards(subStack_2.stackNo), 2);
        subStack_3.addStart(deckCovered.takeCards(subStack_3.stackNo), 3);
        subStack_4.addStart(deckCovered.takeCards(subStack_4.stackNo), 4);
        subStack_5.addStart(deckCovered.takeCards(subStack_5.stackNo), 5);
        subStack_6.addStart(deckCovered.takeCards(subStack_6.stackNo), 6);
        subStack_7.addStart(deckCovered.takeCards(subStack_7.stackNo), 7);

        mainStack_1.start();
        mainStack_2.start();
        mainStack_3.start();
        mainStack_4.start();

        document.querySelector("#deckCovered").addEventListener('click', () =>{
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
                console.log('a')
                active.clearCardsToMove();
                active.deactivateStack();
                active.setActiveStack("deckOpened");
                active.setActiveCard(deckOpened.activate())
            } else if (deckOpened.number > 0 && active.activeStack !== "deckOpened") {
                active.setActiveCard(deckOpened.activate());
                console.log('b')
            } else if (deckOpened.number > 0 && active.activeStack === "deckOpened") {
                active.deactivateStack();
                console.log('c') 
            } else {
                console.log('d')
            }
            
        })
       
    }
    deactivateAll() {
        activeCard = deckOpened.deactivate();
    }
}

const game = new Game();
game.start();