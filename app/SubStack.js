import active from "./Active.js";
import deckOpened from './DeckOpened.js'
import deckCovered from './DeckCovered.js';

export class SubStack {
    cards = [];

    constructor(startStack) {
        this.startStack = startStack;
    };
    mapTextToSign = {
		hearts: '&hearts;',
		spades: '&spades;',
		diamonds: '&diams;',
		clubs: '&clubs;'
    };
    chooseStack(stack, event) {
        
        let stackNo = `#subStack_${stack}`;
        const choosedCardId = Array.prototype.slice.call( document.querySelector(stackNo).children ).indexOf(event.target) ;
        
        if ((active.activeStack === "" && event.target.className.includes("cardFront")) || active.activeStack === "deckCovered") {
            active.clearCardsToMove();
            const subStack = document.querySelector(stackNo);
            for (let i = choosedCardId; i < this.number; i++) {
                active.setCardsToMove(this.cards[i]);
                subStack.childNodes[i].className += " activeCard";
            }
            active.setActiveStackRef(this);
            active.setActiveStack(stack);
        } else if (active.activeStack === `subStack_${stack}`) { //ponowne wybranie
            active.clearCardsToMove();
            active.deactivateStack();
        } else if (active.activeStack.includes("subStack_") && `subStack_${stack}` !== active.activeStack) {

            const firstCardMovedStack = active.cardsToMove[0];
            const firstCardTargetStack = this.cards[this.number-1];

            if (firstCardMovedStack.color !== firstCardTargetStack.color && (firstCardTargetStack.cardIndex - firstCardMovedStack.cardIndex) === 1) {
                active.cardsToMove.forEach( card => {
                    this.addOne(card, stack);
                });
                this.removeCards(active.cardsToMove, active.sourceStack)
                active.deactivateStack();
            }
            else {
                active.deactivateStack();
            } 
        } else if (active.activeStack === "deckOpened" && active.activeCard.color !== this.cardOnTop.color && (this.cardOnTop.cardIndex - active.activeCard.cardIndex) == 1) {
                deckOpened.deactivate();
                this.addOne(deckOpened.pickOne(),this.startStack);
                deckOpened.add(deckCovered.takeCards(1));
        }
    }
    
    addStart(cards, stack) {
        cards.forEach( (card, index) => {
            this.cards.push(card);
            this.number = stack;
            const newCard = document.createElement("div");
            newCard.classList.add("card");
            if (index == stack-1) {
                newCard.classList.add("cardFront");
                newCard.innerHTML = `${card.weight} ${this.mapTextToSign[card.type]}`;
                this.cardOnTop = card;
            } else {
                newCard.classList.add("cardBackward");
            }                
            newCard.classList.add("subStackCard");
            newCard.style = `top: ${index*10}px; color: ${card.color}`;
            document.querySelector(`#subStack_${stack}`).appendChild(newCard);
            newCard.addEventListener('click', (event) => this.chooseStack(stack, event));
            const list = document.querySelector(`#list_subStack_${stack}`);
                let element = document.createElement("li");
                element.innerHTML = `${card.weight} ${card.type} ${card.color}`;
                list.appendChild(element);
        })
    };
    addOne(card, stack) {
        this.cards.push(card);
        this.cardOnTop = card;
        this.number = this.cards.length;
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.classList.add("cardFront");
        newCard.innerHTML = `${card.weight} ${this.mapTextToSign[card.type]}`;
        newCard.classList.add("subStackCard");
        newCard.style = `top: ${this.number*15}px; color: ${card.color}`;
        document.querySelector(`#subStack_${stack}`).appendChild(newCard);
        newCard.addEventListener('click', (event) => this.chooseStack(stack, event));
        active.deactivateStack();
    };
    removeCards(cards,sourceStack) {
        let newCards = [];
        cards.forEach( card => {
            newCards = sourceStack.cards.filter( element => {
                return element !== card;
            });
        })

        const sourceStackDIV = document.querySelector(`#subStack_${sourceStack.startStack}`);
        for (let i = 0; i < cards.length; i++) {
            sourceStackDIV.removeChild(sourceStackDIV.lastChild);
        }

        sourceStack.setCards(newCards);
        if (sourceStack.number > 0)
            sourceStack.showCard(sourceStack);
        

    };
    showCard(sourceStack) {
        const stackDIV = document.querySelector(`#subStack_${sourceStack.startStack}`);
        stackDIV.lastChild.classList.remove("cardBackward");
        stackDIV.lastChild.classList.add("cardFront");
        const lastCard = sourceStack.cards[sourceStack.number-1];
        stackDIV.lastChild.innerHTML = `${lastCard.weight} ${this.mapTextToSign[lastCard.type]}`;
    };
    setCards(cards){
        this.cards=[];
        cards.forEach( card => {
            this.cards.push(card)
        });
        this.number = cards.length;
    }

}
