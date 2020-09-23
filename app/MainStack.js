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
        if (this.cardIndex === 0 && active.activeCard.cardIndex === 14) {
            if (active.activeStack === "deckOpened") {
                deckOpened.deactivate();
                this.addOne(deckOpened.pickOne());
                deckOpened.add(deckCovered.takeCards(1));
            } else if (active.activeStack.includes("subStack_")) {
                this.addOne(active.sourceStack.pickOne());
                
            }
            active.deactivateStack();       
        }
    };
    addOne(card, where) {
        where = ""
        this.cards.push(card);
        this.cardOnTop = card;
        this.number = this.cards.length;
        
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.classList.add("cardFront");
        newCard.innerHTML = `${card.weight} ${this.mapTextToSign[card.type]}`;
        newCard.classList.add("subStackCard");
        newCard.style = `top: ${this.number*15}px; color: ${card.color}`;
        document.querySelector(`#mainStack_${this.stackNo}`).appendChild(newCard);
        // newCard.addEventListener('click', (event) => this.chooseStack(this.stackNo, event));
        // active.deactivateStack();
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

