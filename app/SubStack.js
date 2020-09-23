import active from "./Active.js";
import deckOpened from './DeckOpened.js'
import card from './Card.js';

export class SubStack {
    cards = [];

    constructor(stackNo) {
        this.stackNo = stackNo;
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
            console.log(`choosedCardId: ${choosedCardId}, this.number: ${this.number}`)
            for (let i = choosedCardId; i < this.number; i++) {
                console.log(choosedCardId, ' - ', this.number)
                active.addCardsToMove(this.cards[i]);
                subStack.childNodes[i].className += " activeCard";
            }
            active.setActiveStackRef(this);
            active.setActiveStack(stack);
            
            if (choosedCardId+1 == this.number) {
                active.setActiveCard(this.cards[this.number-1]);
            }

        } else if (active.activeStack === `subStack_${stack}`) { //ponowne wybranie
            active.clearCardsToMove();
            active.deactivateStack();
        } else if (active.activeStack.includes("subStack_") && `subStack_${stack}` !== active.activeStack) {
            const firstCardMovedStack = active.cardsToMove[0];
            const firstCardTargetStack = this.cards[this.number-1];
            if (firstCardMovedStack.color !== firstCardTargetStack.color && (firstCardTargetStack.cardIndex - firstCardMovedStack.cardIndex) === 1) {
                active.cardsToMove.forEach( card => {
                    this.addOne(card);
                });
                this.removeCards(active.cardsToMove, active.sourceStack)
                active.deactivateStack();
            }
            else {
                active.deactivateStack();
            } 
        } else if (active.activeStack === "deckOpened" && active.activeCard.color !== this.cardOnTop.color && (this.cardOnTop.cardIndex - active.activeCard.cardIndex) == 1) {
            deckOpened.deactivate();
            this.addOne(deckOpened.pickOne());
        }
        event.stopPropagation();
    }
    
    addStart(cards, stack) {
        active.activeCards;
        document.querySelector(`#subStack_${stack}`).addEventListener('click', () =>{
            if (active.activeStack === "deckOpened" && active.activeCard.cardIndex == 13 && this.number === 0) {
                deckOpened.deactivate();
                this.addOne(deckOpened.pickOne());
            } else if (active.activeStack.includes ("subStack_") 
                && active.cardsToMove[active.cardsToMove.length-1].cardIndex == 13 
                && this.number === 0 
                && `subStack_${stack}` !== active.activeStack) {
                    active.cardsToMove.forEach( card => {
                        this.addOne(card);
                    });
                    this.removeCards(active.cardsToMove, active.sourceStack)
                    active.deactivateStack();
                    console.log('próba przeniesienia stosu z królem');
            }
            
        })
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
            newCard.addEventListener('click', (event) => this.chooseStack(this.stackNo, event));
            const list = document.querySelector(`#list_subStack_${stack}`);
                let element = document.createElement("li");
                element.innerHTML = `${card.weight} ${card.type} ${card.color}`;
                list.appendChild(element);
        })
        this.number = cards.length;
    };
    addOne(card) {
        this.cards.push(card);
        this.cardOnTop = card;
        this.number = this.cards.length;
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.classList.add("cardFront");
        newCard.innerHTML = `${card.weight} ${this.mapTextToSign[card.type]}`;
        newCard.classList.add("subStackCard");
        newCard.style = `top: ${card.countTop(this)}px; color: ${card.color}`;
        document.querySelector(`#subStack_${this.stackNo}`).appendChild(newCard);
        newCard.addEventListener('click', (event) => this.chooseStack(this.stackNo, event));
        active.deactivateStack();
    };
    pickOne() {
        const cards = [];
        const card = this.cardOnTop;
        cards.push = this.cardOnTop;

        this.removeCard();

        return card;
    };
    removeCard(){
        let newCards = active.sourceStack.cards.filter( card => {return card !== active.sourceStack.cardOnTop});
        active.sourceStack.setCards(newCards);
        const sourceStackDIV = document.querySelector(`#subStack_${active.sourceStack.stackNo}`);
        sourceStackDIV.removeChild(sourceStackDIV.lastChild);
       
        if (active.sourceStack.number > 0)
            active.sourceStack.showCard(active.sourceStack);
        active.sourceStack.setNumber(newCards.length);
        
    };
    removeCards(cards,sourceStack) {

        let newCards = [];
        cards.forEach( card => {
            newCards = sourceStack.cards.filter( element => {
                return element !== card;
            });
        }) 

        sourceStack.setNumber(newCards.length);

        const sourceStackDIV = document.querySelector(`#subStack_${sourceStack.stackNo}`);
        for (let i = 0; i < cards.length; i++) {
            sourceStackDIV.removeChild(sourceStackDIV.lastChild);
        }

        sourceStack.setCards(newCards);
        if (sourceStack.number > 0)
            sourceStack.showCard(sourceStack);
        


    };
    showCard(sourceStack) {
        const stackDIV = document.querySelector(`#subStack_${sourceStack.stackNo}`);
        console.log(sourceStack)
        if (sourceStack.number > 0) {
            const lastCard = sourceStack.cards[sourceStack.number-1];
            stackDIV.lastChild.className = `card cardFront subStackCard ${lastCard.color}`;
            stackDIV.lastChild.innerHTML = `${lastCard.weight} ${this.mapTextToSign[lastCard.type]}`;
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