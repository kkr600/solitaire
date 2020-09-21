import { DeckCovered } from './DeckCovered.js';
import { MainStacks } from './MainStacks.js';
import { SubStack } from './SubStack.js';
import { DeckOpened } from './DeckOpened.js';
import active from './Active.js';

class Game {
    start() {
        this.deckCovered = new DeckCovered();
        this.deckCovered.shuffle();
        this.deckOpened = new DeckOpened();
        this.subStack_1 = new SubStack(1);
        this.subStack_2 = new SubStack(2);
        this.subStack_3 = new SubStack(3);
        this.subStack_4 = new SubStack(4);
        this.subStack_5 = new SubStack(5);
        this.subStack_6 = new SubStack(6);
        this.subStack_7 = new SubStack(7);

        this.subStack_1.addStart(this.deckCovered.takeCards(this.subStack_1.startStack), 1);
        this.subStack_2.addStart(this.deckCovered.takeCards(this.subStack_2.startStack), 2);
        this.subStack_3.addStart(this.deckCovered.takeCards(this.subStack_3.startStack), 3);
        this.subStack_4.addStart(this.deckCovered.takeCards(this.subStack_4.startStack), 4);
        this.subStack_5.addStart(this.deckCovered.takeCards(this.subStack_5.startStack), 5);
        this.subStack_6.addStart(this.deckCovered.takeCards(this.subStack_6.startStack), 6);
        this.subStack_7.addStart(this.deckCovered.takeCards(this.subStack_7.startStack), 7);

        document.querySelector("#deckCovered").addEventListener('click', (event) =>{
            if (active.activeStack.includes("subStack_")) {
                active.deactivateStack();
            }
            if (this.deckCovered.number > 0) {
                this.deckOpened.add(this.deckCovered.takeCards(1));
                active.setActiveStack("deckCovered");
            } else {
                this.deckCovered.add(this.deckOpened.takeAll());
                active.setActiveStack("deckCovered");
            }
        })

        document.querySelector("#deckOpened").addEventListener('click', () =>{
            if (active.activeStack.includes("subStack_")) {
                active.deactivateStack();
                active.setActiveStack("deckOpened");
                console.log(this.deckOpened.cardOnTop)
                active.setActiveCard(this.deckOpened.activate())
                console.log('done')
            } else if (this.deckOpened.number > 0 && active.activeStack !== "deckOpened") {
                active.setActiveCard(this.deckOpened.activate());
            } else if (this.deckOpened.number > 0 && active.activeStack === "deckOpened") {
                active.deactivateStack();
            } 
            
        })

        document.querySelector("#subStack_1").addEventListener('click', () => {
            if (active.activeStack === "deckOpened" && active.setActiveCard.color !== this.subStack_1.cardOnTop.color && (this.subStack_1.cardOnTop.cardIndex - active.activeCard.cardIndex) == 1) {
                console.log(1);
                this.deckOpened.deactivate();
                this.subStack_1.addOne(this.deckOpened.pickOne(),1);
                this.deckOpened.add(this.deckCovered.takeCards(1));
            } 
        })

        document.querySelector("#subStack_2").addEventListener('click', () => {
            if (active.activeStack === "deckOpened" && active.setActiveCard.color !== this.subStack_2.cardOnTop.color && (this.subStack_2.cardOnTop.cardIndex - active.activeCard.cardIndex) == 1) {
                console.log(1);
                this.deckOpened.deactivate();
                this.subStack_2.addOne(this.deckOpened.pickOne(),2);
                this.deckOpened.add(this.deckCovered.takeCards(1));
            }
        })

        document.querySelector("#subStack_3").addEventListener('click', () => {
            if (active.activeStack === "deckOpened" && active.setActiveCard.color !== this.subStack_3.cardOnTop.color && (this.subStack_3.cardOnTop.cardIndex - active.activeCard.cardIndex) == 1) {
                console.log(1);
                this.deckOpened.deactivate();
                this.subStack_3.addOne(this.deckOpened.pickOne(),3);
                this.deckOpened.add(this.deckCovered.takeCards(1));
            }
        })

        document.querySelector("#subStack_4").addEventListener('click', () => {
            if (active.activeStack === "deckOpened" && active.setActiveCard.color !== this.subStack_4.cardOnTop.color && (this.subStack_4.cardOnTop.cardIndex - active.activeCard.cardIndex) == 1) {
                console.log(1);
                this.deckOpened.deactivate();
                this.subStack_4.addOne(this.deckOpened.pickOne(),4);
                this.deckOpened.add(this.deckCovered.takeCards(1));
            }
        })

        document.querySelector("#subStack_5").addEventListener('click', () => {
            if (active.activeStack === "deckOpened" && active.setActiveCard.color !== this.subStack_5.cardOnTop.color && (this.subStack_5.cardOnTop.cardIndex - active.activeCard.cardIndex) == 1) {
                console.log(1);
                this.deckOpened.deactivate();
                this.subStack_5.addOne(this.deckOpened.pickOne(),5);
                this.deckOpened.add(this.deckCovered.takeCards(1));
            }
        })

        document.querySelector("#subStack_6").addEventListener('click', () => {
            if (active.activeStack === "deckOpened" && active.setActiveCard.color !== this.subStack_6.cardOnTop.color && (this.subStack_6.cardOnTop.cardIndex - active.activeCard.cardIndex) == 1) {
                console.log(1);
                this.deckOpened.deactivate();
                this.subStack_6.addOne(this.deckOpened.pickOne(),6);
                this.deckOpened.add(this.deckCovered.takeCards(1));
            }
        })

        document.querySelector("#subStack_7").addEventListener('click', () => {
            if (active.activeStack === "deckOpened" && active.setActiveCard.color !== this.subStack_7.cardOnTop.color && (this.subStack_7.cardOnTop.cardIndex - active.activeCard.cardIndex) == 1) {
                console.log(1);
                this.deckOpened.deactivate();
                this.subStack_7.addOne(this.deckOpened.pickOne(),7);
                this.deckOpened.add(this.deckCovered.takeCards(1));
            }
        })
       
    }
    deactivateAll() {
        this.activeCard = this.deckOpened.deactivate();
    }
}

const game = new Game();
game.start();