import active from "./Active.js";

export class SubStack {
    cards = [];
    cardsToMove = [];
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
        this.cardsToMove = [];
        let stackNo = `#subStack_${stack}`;
        
        const choosedCardId = Array.prototype.slice.call( document.querySelector(stackNo).children ).indexOf(event.target) ;
        
        if ((active.activeStack === "" && event.target.className.includes("cardFront")) || active.activeStack === "deckCovered") {
            console.log(`pierwsze kliknięcie`);
            const subStack = document.querySelector(stackNo);
         
            for (let i = choosedCardId; i < this.number; i++) {
                this.cardsToMove.push(this.cards[i]);
                subStack.childNodes[i].className += " activeCard";
            }

            console.log(this.cardsToMove)
            active.setActiveStack(stack);
            console.log(`aktywny stos: ${active.activeStack}`)
        } else if (active.activeStack === `subStack_${stack}`) {
            console.log('ponowne wybranie')
        } else if (active.activeStack.includes("subStack_") && `subStack_${stack}` !== active.activeStack) {
            console.log(`próba przeniesienia, aktywny stack: ${active.activeStack}`);
        } else if (active.activeStack === "deckOpened") {
            console.log('wybranie po opened - tego nie może być');
        }


        
    }
    selectStack() {

    }


    moveStack(event) {
        if (active.activeStack === "" /*&& event.target.className.includes("cardFront")*/) {
            console.log(0)



        }
        
        // event.target.className += " activeCard";
        // console.log(event)
        // if (event.targer.next !== null) {
        //     this.moveStack(event.target.nextSibling)
        // }
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
        
    }
}
