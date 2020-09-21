export class Active {
    setActiveCard(card) {
        this.activeCard = card;
    };
    deactivateCard() {
        this.activeCard = [];
    };

    setActiveCards(cards){
        cards.forEach( card =>{
            this.activeCards.push(card[0]);
        });
    };
    deactivateCards() {
        this.activeCards = [];
    };

    setActiveStack(stack) {
        this.activeStack = stack;
    };
    deactivateStack(){
        this.activeStack = "";
        this.deactivateCard();
    }
}

const active = new Active();

export default active;