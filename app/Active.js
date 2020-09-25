export class Active {

    constructor(){
        this.activeCard = [];
        this.activeCards = [];
        this.activeStack = {};
        this.cardsToMove = [];
        this.sourceStack;
    };

    setActiveCard(card) {
        this.activeCard = card;
        const div = document.querySelector(`#${this.activeStack.name}`);
        div.lastChild.classList.add("activeCard");
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
    setSourceStack(stack){
        this.sourceStack = stack;
    };
    deactivateStack(){
        const DIVs = document.querySelectorAll('.activeCard');
        DIVs.forEach( div => {
            div.classList.remove("activeCard")
        })
        
        this.activeStack = {};
        this.sourceStack = {};
        this.deactivateCard();
        this.clearCardsToMove();
    };
    addCardsToMove(card){
            this.cardsToMove.push(card)
    };
    clearCardsToMove(){
        this.cardsToMove = [];
    };
    
}

const active = new Active();
export default active;