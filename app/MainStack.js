import active from "./Active.js";
import deckOpened from "./DeckOpened.js";
import game from "./Game.js";
import card from "./Card.js";

export class MainStack {
    cards = [];
    cardIndex = 0;
    constructor(stackNo) {
        this.stackNo = stackNo;
        this.name = `mainStack_${stackNo}`;
    };
    start() {
        const stackDIV = document.querySelector(`#mainStack_${this.stackNo}`);
        stackDIV.addEventListener( 'click', ()=>{this.select();})
    };
    select() {
        if (Object.keys(active.activeCard).length  
            && this.cardIndex === 0 
            && active.activeCard.cardIndex === 1) { 
                if (active.activeStack.name === "deckOpened") {
                    active.deactivateStack();
                    this.addOne(deckOpened.pickOne());
                } else if (active.activeStack.name.includes("subStack_")) {
                    this.addOne(active.sourceStack.pickOneToMain()); 
                }
                this.cardIndex = this.cardOnTop.cardIndex;
                active.deactivateStack();       
        } else if (Object.keys(active.activeCard).length 
            && this.cardOnTop !== undefined
            && this.cardOnTop.cardIndex > 0 && this.cardOnTop.cardIndex < 14 
            && active.activeStack.name === "deckOpened"
            && (active.activeCard.cardIndex - this.cardOnTop.cardIndex) === 1 
            && this.cardOnTop.type === active.activeCard.type ) {
                this.addOne(deckOpened.pickOne());
                active.deactivateStack();
        } else if (Object.keys(active.activeCard).length 
            && this.cardOnTop !== undefined
            && this.cardOnTop.cardIndex > 0 && this.cardOnTop.cardIndex < 14 
            && active.activeStack.name.includes("subStack_") 
            && (active.activeCard.cardIndex - this.cardOnTop.cardIndex) === 1 
            && this.cardOnTop.type === active.activeCard.type) {
                this.addOne(active.sourceStack.pickOneToMain()); 
                active.deactivateStack();
        } 
        else if (this.cardOnTop !== undefined
            && this.cardOnTop.cardIndex > 0 && this.cardOnTop.cardIndex < 14) {
            active.deactivateStack();
            active.setActiveStack(this);
            active.setActiveCard(this.cardOnTop);
        }
        event.stopPropagation();
    };
    addOne(newCard) {
        this.cards.push(newCard);
        this.cardOnTop = newCard;
        this.number = this.cards.length;
        const mainStack = document.querySelector(`#mainStack_${this.stackNo}`);
        if (mainStack.childNodes.length > 0)
            mainStack.removeChild(mainStack.lastChild)
        mainStack.appendChild(card.render(newCard, "cardFront"));
        game.checkWin();
    };
    pickOne() {
        const div = document.querySelector(`#${active.activeStack.name}`);
        console.log(active.activeStack.name);
        let cardTemp = active.activeStack.cardOnTop;
        active.activeStack.cards.pop();
        let newCard = active.activeStack.cards[active.activeStack.cards.length-1]
        div.removeChild(div.lastChild);
        div.appendChild(card.render(newCard, "cardFront"));
        return cardTemp;
    }
}

const mainStack_1 = new MainStack(1);
const mainStack_2 = new MainStack(2);
const mainStack_3 = new MainStack(3);
const mainStack_4 = new MainStack(4);

export {
    mainStack_1,
    mainStack_2,
    mainStack_3,
    mainStack_4
}

