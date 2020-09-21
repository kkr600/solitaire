export class Active {

    constructor(){
        this.activeCard = [];
        this.activeCards = [];
        this.activeStack = "";
        this.activeStackNo = "";
        this.cardTomove = [];
    };

    setActiveCard(card) {
        console.log(card)
        this.activeCard = card;
        console.log(`aktywna karta:`);
        console.log(this.activeCard);
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
        
        console.log(`ustawienie nowego stacka: ${this.activeStack}`)
        
        this.activeStackNo = stack;
    };
    deactivateStack(){
        console.log(`deactivateStack`)
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

        // console.log(stack.childNodes[2]);
        // stack.childNodes.forEach( child => {
        //     child.classList.remove(" activeCard");
        // });

        this.activeStack = "";
        this.activeStackNo = "";
        this.deactivateCard();
    };
    setCardToMove(cards){
        cards.forEach( card =>{
            this.cardTomove.push(card[0]);
        });
    };
    clearCardToMove(){
        this.cardTomove = [];
    };
    
}

const active = new Active();

export default active;