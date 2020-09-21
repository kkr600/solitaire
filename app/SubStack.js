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
    moveStack(event) {
        event.target.className += " activeCard";
        console.log(event)
        /*if (event.targer.next !== null) {
            this.moveStack(event.target.nextSibling)
        }*/
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
            newCard.addEventListener('click', (event)=>{
                /*if (event.target.className.includes("cardFront")) {
                    this.moveStack(event)
                }*/
            })
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
        newCard.addEventListener('click', (event)=>{
            /*if (event.target.className.includes("cardFront"))
                this.moveStack(event)*/
        })
    }
}
