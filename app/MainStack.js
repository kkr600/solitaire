import active from "./Active.js";
import deckOpened from "./DeckOpened.js";
import deckCovered from "./DeckCovered.js";

export class MainStack {
    cards = [];
    cardIndex = 0;
    constructor(stackNo) {
        this.stackNo = stackNo;
    };
    mapTextToSign = {
		hearts: '&hearts;',
		spades: '&spades;',
		diamonds: '&diams;',
		clubs: '&clubs;'
    };
    start() {
        const stackDIV = document.querySelector(`#mainStack_${this.stackNo}`);
        stackDIV.addEventListener( 'click', ()=>{this.select();})
    };
    select() {
        console.log(active)
        if (this.cardIndex === 0 && active.activeCard.cardIndex === 14) { 
            if (active.activeStack === "deckOpened") {
                deckOpened.deactivate();
                this.addOne(deckOpened.pickOne());
                deckOpened.add(deckCovered.takeCards(1));
            } else if (active.activeStack.includes("subStack_")) {
                this.addOne(active.sourceStack.pickOne()); 
            }
            this.cardIndex = this.cardOnTop.cardIndex;
            active.deactivateStack();       
        } 

        else if (this.cardOnTop.cardIndex === 14 
            && active.activeStack.includes("subStack_") 
            && active.activeCard.cardIndex == 2 
            && this.cardOnTop.type === active.activeCard.type ) {
                this.addOne(active.sourceStack.pickOne()); 
        } else if (this.cardOnTop.cardIndex === 14 
            && active.activeStack === "deckOpened" 
            && active.activeCard.cardIndex == 2 
            && this.cardOnTop.type === active.activeCard.type ) {
                this.addOne(deckOpened.pickOne());

        } 
        
        
        else if (this.cardOnTop.cardIndex != 14 
            && active.activeStack.includes("subStack_") 
            && (active.activeCard.cardIndex - this.cardOnTop.cardIndex) === 1 
            && this.cardOnTop.type === active.activeCard.type ) {
                this.addOne(active.sourceStack.pickOne()); 
            }
        else {
            console.log('else');
            console.log(this);
            console.log(active)
        }
    };
    addOne(card, where) {
        where = ""
        this.cards.push(card);
        this.cardOnTop = card;
        this.number = this.cards.length;
        
        const mainStack = document.querySelector(`#mainStack_${this.stackNo}`);
        mainStack.className = `card cardFront subStack ${this.cardOnTop.color}`;
        mainStack.innerHTML = `${card.weight} ${this.mapTextToSign[card.type]}`;
        // const newCard = document.createElement("div");
        // newCard.classList.add("card");
        // newCard.classList.add("cardFront");
        // newCard.innerHTML = `${card.weight} ${this.mapTextToSign[card.type]}`;
        // document.querySelector(`#mainStack_${this.stackNo}`).appendChild(newCard);
        
    };
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

