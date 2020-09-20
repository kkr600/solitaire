export class DeckOpened {

    cards = [];
    
    constructor() {
        this.number = 0;
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
        document.querySelector("#numberOpened").innerHTML = `Kart odkrytych: ${this.number}.`;
        this.render();
    };
    takeAll() {
        let toTake = this.cards.splice(0);
        this.number = this.cards.length;
        document.querySelector("#numberOpened").innerHTML = `Kart odkrytych: ${this.number}.`;
        deckOpen.classList.remove("card");
        deckOpen.classList.remove("cardFront");
        deckOpen.classList.add("none");
        deckOpen.innerHTML = "";
        return toTake;
    };
    render() {
        const deckOpen = document.querySelector("#deckOpen");
        deckOpen.classList.remove("none");
        deckOpen.classList.add("card");
        deckOpen.classList.add("cardFront");
        const lastCard = this.cards[this.number-1][0];
        deckOpen.innerHTML = `${lastCard.weight} ${this.mapTextToSign[lastCard.type]}`;

    };
    activate() {
        const lastCard = this.cards[this.number-1][0];
        document.querySelector("#deckOpen").classList.add("activeCard");
        return lastCard;
    };
    deactivate() {
        document.querySelector("#deckOpen").classList.remove("activeCard");
        return "";
    }
    addColor = 
}


