export class Active {
    setActiveCard(card) {
        console.log(card);
        this.activeCard = card[0];
        console.log(this.activeCard)
    };

    setActiveCards(cards){
        cards.forEach( card =>{
            this.activeCards.push(card[0]);
        });
    }

    setActiveStack(stack) {
        this.activeStack = stack;
    };

    deactivateCard(card) {
        this.activeCard = [];
    }

    deactivateCards() {
        this.activeCards = [];
    }

    deactivateStack(){
        this.activeStack = "";
    }
}

const active = new Active();

export default active;