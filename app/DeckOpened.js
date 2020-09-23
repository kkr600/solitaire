import active from './Active.js';

export class DeckOpened {

    cards = [];
    
    constructor() {
        this.number = 0;
        this.active = false;
    };
	mapTextToSign = {
		hearts: '&hearts;',
		spades: '&spades;',
		diamonds: '&diams;',
		clubs: '&clubs;'
	};
    add(card) {
        this.cards.push(card);
        this.number = this.cards.length;
        this.cardOnTop = card[0];
        this.render();
        this.deactivate();
    };
    takeAll() {
        const deckOpen = document.querySelector("#deckOpened");
        let toTake = this.cards.splice(0);
        this.number = this.cards.length;
        deckOpen.classList.remove("card");
        deckOpen.classList.remove("cardFront");
        deckOpen.classList.add("none");
        deckOpen.innerHTML = "";
        this.cardOnTop = "";
        toTake.reverse();
        return toTake;
    };
    pickOne() {
        let toTake = this.cards.splice(this.number-1,1)[0];
        this.number = this.cards.length;
        this.cardOnTop = this.cards[this.number];
        return toTake[0];
    }
    render() {
        const deckOpen = document.querySelector("#deckOpened");
        deckOpen.classList.remove("none");
        deckOpen.classList.add("card");
        deckOpen.classList.add("cardFront");
        const lastCard = this.cards[this.number-1][0];
        deckOpen.innerHTML = `${lastCard.weight} ${this.mapTextToSign[lastCard.type]}`;
        deckOpen.style = `color: ${lastCard.color}`;
    };
    activate() {
        const lastCard = this.cards[this.number-1][0];
        document.querySelector("#deckOpened").classList.add("activeCard");
        active.setActiveStack("deckOpened");
        return lastCard;
    };
    deactivate() {
        document.querySelector("#deckOpened").classList.remove("activeCard");
        // active.deactivateStack();
        return "";
    }
}

const deckOpened = new DeckOpened();
export default deckOpened;