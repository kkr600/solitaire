import active from "./Active.js";
import deckOpened from './DeckOpened.js';
import mainStack from './DeckCovered.js';
import card from './Card.js';

export class SubStack {
    cards = [];
    constructor(stackNo) {
        this.stackNo = stackNo;
        this.name = `subStack_${stackNo}`
    };
    addStart(cards, stack) {
        const stackDIV = document.querySelector(`#subStack_${stack}`);
        stackDIV.addEventListener('click', () =>{ this.selectEmptyStack(); });
        cards.forEach( (oneCard, index) => {
            this.cards.push(oneCard);
            this.number = stack;
            let site = "";
            if (index === stack-1) {
                site = "cardFront";
                this.cardOnTop = oneCard;
            } else {
                site = "cardBackward";
            }
            const newCard = card.render(oneCard, site);  
            newCard.classList.add("subStackCard");
            stackDIV.appendChild(newCard);
            newCard.setAttribute('style', `top: ${card.countTop(this, 'start')}px`);
            newCard.addEventListener('click', (event) => this.chooseStack(this.stackNo, event));
        })
        this.number = cards.length;
    };
    chooseStack(stack, event) {
        const subStack = document.querySelector(`#subStack_${stack}`);
        const choosedCardId = Array.prototype.slice.call( subStack.children ).indexOf(event.target);
        if (Object.keys(active.activeStack).length === 0 && event.target.className.includes("cardFront")) { //pierwsze wybranie
            active.clearCardsToMove();
            for (let i = choosedCardId; i < this.number; i++) {
                active.addCardsToMove(this.cards[i]);
                subStack.childNodes[i].className += " activeCard";
            }
            active.setActiveStack(this);
            active.setSourceStack(this);
            if (choosedCardId+1 == this.number) {
                active.setActiveCard(this.cards[this.number-1]);
            }
        } else if (Object.keys(active.activeStack).length && active.activeStack.name === this.name) { //ponowne wybranie
            active.clearCardsToMove();
            active.deactivateStack();
        } else if (Object.keys(active.activeStack).length && active.activeStack.name.includes("subStack_") && this.name !== active.activeStack.name) { //próba przeniesienia
            const firstCardMovedStack = active.cardsToMove[0];
            const firstCardTargetStack = this.cards[this.number-1];
            if (firstCardMovedStack.color !== firstCardTargetStack.color && (firstCardTargetStack.cardIndex - firstCardMovedStack.cardIndex) === 1) {
                active.cardsToMove.forEach( card => {
                    this.addOne(card);
                });
                this.removeCards(active.cardsToMove, active.sourceStack)
            }
            active.deactivateStack();
        } else if (Object.keys(active.activeStack).length && active.activeStack.name === "deckOpened"
            && active.activeStack.cardOnTop.color !== this.cardOnTop.color
            && (this.cardOnTop.cardIndex - active.activeStack.cardOnTop.cardIndex) === 1) {
                this.addOne(deckOpened.pickOne());
                active.deactivateStack();
        } else if (Object.keys(active.activeStack).length && active.activeStack.name.includes("mainStack_")
            && active.activeStack.cardOnTop.color !== this.cardOnTop.color
            && (this.cardOnTop.cardIndex - active.activeStack.cardOnTop.cardIndex) === 1) {
                this.addOne(active.activeStack.pickOne());
                active.deactivateStack();
        } else {
            active.deactivateStack();
            active.clearCardsToMove();
            active.setActiveStack(this);
            active.setSourceStack(this);
        }
        event.stopPropagation();
    }
    selectEmptyStack() {
        if (Object.keys(active.activeStack).length && active.activeStack.name === "deckOpened" && active.activeCard.cardIndex == 13 && this.number === 0) {
            this.addOne(deckOpened.pickOne());
        } else if (Object.keys(active.activeStack).length 
            && active.activeStack.name.includes("subStack_") 
            && active.cardsToMove[0].cardIndex == 13 
            && this.number === 0 
            && `subStack_${this.stackNo}` !== active.activeStack) {
                active.cardsToMove.forEach( card => {
                    this.addOne(card);
                });
                this.removeCards(active.cardsToMove, active.sourceStack)
                active.deactivateStack();
        }
        active.deactivateStack();
    };
    addOne(oneCard) {
        const stackDIV = document.querySelector(`#subStack_${this.stackNo}`);
        this.cards.push(oneCard);
        this.cardOnTop = oneCard;
        this.number = this.cards.length;
        const newCard = card.render(oneCard, 'cardFront');
        newCard.classList.add("subStackCard");
        newCard.setAttribute('style', `top: ${card.countTop(this)}px`);
        stackDIV.appendChild(newCard);
        newCard.addEventListener('click', (event) => this.chooseStack(this.stackNo, event));
    };
    pickOneToMain() {
        const cardTemp = this.cardOnTop;
        this.removeCard();
        return cardTemp;
    };
    removeCard(){
        let newCards = active.sourceStack.cards.filter( card => {return card !== active.activeStack.cards[active.activeStack.number-1]});
        active.sourceStack.setCards(newCards);
        const sourceStackDIV = document.querySelector(`#subStack_${active.sourceStack.stackNo}`);
        sourceStackDIV.removeChild(sourceStackDIV.lastChild);
        if (active.sourceStack.number > 0) {
            active.sourceStack.showCard(active.sourceStack);
        }
        active.sourceStack.setNumber(newCards.length);
    };
    removeCards(cards,sourceStack) {
        let newCards = [];
        let nubmerCardToRemove = cards.length;
        newCards = sourceStack.cards.slice(0, sourceStack.cards.length - nubmerCardToRemove);
        const sourceStackDIV = document.querySelector(`#subStack_${sourceStack.stackNo}`);
        for (let i = 0; i < cards.length; i++) {
            sourceStackDIV.removeChild(sourceStackDIV.lastChild);
        }
        sourceStack.setCards(newCards);
        if (sourceStack.number > 0) {
            this.cardOnTop = this.cards[this.cards.length-1]
            sourceStack.showCard(sourceStack);
        }
    };
    showCard(sourceStack) {
        const stackDIV = document.querySelector(`#subStack_${sourceStack.stackNo}`);
        if (sourceStack.number > 0) {
            stackDIV.removeChild(stackDIV.lastChild);
            const lastCard = sourceStack.cards[sourceStack.number-1];
            const newCard = card.render(lastCard, 'cardFront');
            newCard.classList.add("subStackCard");
            newCard.setAttribute('style', `top: ${card.countTop(this)}px`);
            stackDIV.appendChild(newCard);
            newCard.addEventListener('click', (event) => this.chooseStack(this.stackNo, event));
            this.cardOnTop = lastCard;
        }
    };
    setCards(cards){        
        this.cards=[];
        cards.forEach( card => {
            this.cards.push(card)
        });
        this.number = cards.length;
    };
    setNumber(number) {
        this.number = number;
    }
}

const subStack_1 = new SubStack(1);
const subStack_2 = new SubStack(2);
const subStack_3 = new SubStack(3);
const subStack_4 = new SubStack(4);
const subStack_5 = new SubStack(5);
const subStack_6 = new SubStack(6);
const subStack_7 = new SubStack(7);

export {
    subStack_1,
    subStack_2,
    subStack_3,
    subStack_4,
    subStack_5,
    subStack_6,
    subStack_7
}