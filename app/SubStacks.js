export class SubStacks {
    cards = [];
    constructor(startStack) {
        this.startStack = startStack;
    }
    add(cards) {
        this.cards.push(cards);
    }
}