export class Active {

    constructor(){
        this.activeCard = [];
        this.activeCards = [];
        this.activeStack = "";
        this.activeStackNo = "";
        this.cardsToMove = [];
        this.sourceStack;
    };

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
        this.activeStack = stack.length > 1 ? stack : `subStack_${stack}`;
        this.activeStackNo = stack;
    };
    setActiveStackRef(stack){
        this.sourceStack = stack;
    }
    deactivateStack(){
        if (this.activeStack.includes("subStack_")) {
            const stack = document.querySelector(`#subStack_${active.activeStackNo}`);  
            stack.childNodes.forEach( child => {
                child.classList.remove("activeCard");
            })
        }
        
        switch(this.activeStack) {
            case "deckOpened":
                document.querySelector("#deckOpened").classList.remove("activeCard");
            break;

        }

        this.activeStack = "";
        this.activeStackNo = "";
        this.deactivateCard();
    };
    addCardsToMove(card){
            // console.log(card)
            this.cardsToMove.push(card)
    };
    clearCardsToMove(){
        this.cardsToMove = [];
    };
    
}

const active = new Active();
export default active;