import active from './Active.js';
import card from './Card.js';
import { mainStack_1, mainStack_2, mainStack_3, mainStack_4 } from './MainStack.js';

export class DeckOpened {
    cards = [];
    name = 'deckOpened';
    number = 0;
    add(cardToAdd) {
        this.cards.push(cardToAdd);
        this.number = this.cards.length;
        this.cardOnTop = cardToAdd[0];
        const deckOpen = document.querySelector("#deckOpened");
        if (deckOpen.childNodes.length > 0) {
            deckOpen.removeChild(deckOpen.lastChild);
        }
        deckOpen.appendChild(card.render(this.cardOnTop, 'cardFront'));
        deckOpen.lastChild.addEventListener('click', () => {
            this.select();
        });
        const tempThis = this;
        const manager = new Hammer.Manager(deckOpen.lastChild);
        const DoubleTap = new Hammer.Tap({
            event: 'doubletap',
            taps: 2
            });
        manager.add(DoubleTap);
        manager.on('doubletap', () => {
            tempThis.dbl(tempThis)
        });
        active.deactivateStack();
    };
    select() {
        if (Object.keys(active.activeStack).length === 0 || active.activeStack.name !== "deckOpened") {
            active.deactivateStack();
            active.setActiveStack(this);
            active.setActiveCard(this.cardOnTop);
        } else if (active.activeStack.name === "deckOpened") {
            active.deactivateStack();
        } 
        event.stopPropagation();
    }
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
        const deckOpenedDIV = document.querySelector("#deckOpened");
        if (this.number > 0) {
            this.cardOnTop = this.cards[this.number-1][0];
            deckOpenedDIV.removeChild(deckOpenedDIV.lastChild);
            deckOpenedDIV.appendChild(card.render(this.cardOnTop,'cardFront')); 
            deckOpenedDIV.lastChild.addEventListener('click', () => {
                this.select();
            });
            const tempThis = this;
            const manager = new Hammer.Manager(deckOpenedDIV.lastChild);
            const DoubleTap = new Hammer.Tap({
                event: 'doubletap',
                taps: 2
                });
            manager.add(DoubleTap);
            manager.on('doubletap', () => {
                tempThis.dbl(tempThis)
            });
        }
        else {
            deckOpenedDIV.classList = [];
            deckOpenedDIV.className = "card openEmpty none";
            deckOpenedDIV.style = "cursor: auto";
            deckOpenedDIV.removeEventListener;
            deckOpenedDIV.innerHTML = "";
        } 
        return toTake[0];
    };
    dbl(stack) {
        const mainStacks = [mainStack_1, mainStack_2, mainStack_3, mainStack_4];
        let end = false;
        mainStacks.forEach( mainStack => {
            if (mainStack.number > 0 
                && mainStack.cardOnTop.type === stack.cardOnTop.type
                && (stack.cardOnTop.cardIndex - mainStack.cardOnTop.cardIndex) === 1
                && !end) {
                    mainStack.addOne(stack.pickOne());
                    end = true;
            } else if (mainStack.number == 0
                && stack.cardOnTop.cardIndex === 1
                && !end) {
                    mainStack.addOne(stack.pickOne());
                    end = true;
                }
        })
    };
}

const deckOpened = new DeckOpened();
export default deckOpened;