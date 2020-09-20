export class SubStacks {
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
    add(cards, stack) {

        cards.forEach( card => {
            this.cards.push(card);
            const newCard = document.createElement("div");
            newCard.classList.add("card");
            newCard.classList.add("cardFront");
            // newCard.classList.add("");
            newCard.classList.add("subStackCard");

            newCard.innerHTML = `${card.weight} ${this.mapTextToSign[card.type]}`;

            document.querySelector(`#subStack_${stack}`).appendChild(newCard);
            // const newCard = new Card(card.weight, card.type);

        })
        
    };
}