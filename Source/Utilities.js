process.stdin.setEncoding("utf8");

const ShuffleDeck = (Deck) => {
    for (let i = Deck.length - 1; i > 0; i--) {
        const RandomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * (i + 1));

        [Deck[i], Deck[RandomIndex]] = [Deck[RandomIndex], Deck[i]];
    };
};

const ShuffleAllDecks = (Entities) => {
    Entities.forEach(Entity => {
        ShuffleDeck(Entity.Deck);
    });
}

const DrawInitialCards = (Entities) => {
    Entities.forEach(Entity => {
        for (let i = 0; i < 3; i++) {
            Entity.CardsInHand.push(Entity.Deck[Entity.Deck.length - 1]);
            Entity.Deck.pop();
        };
    });
};

const ChooseCard = (InputDescription, CardsInHand) => {
    return new Promise(Resolve => {
        process.stdin.resume();

        process.stdin.once("data", (Input) => {
            process.stdin.pause();
            console.log(InputDescription + CardsInHand[Number(Input) - 1] + "\n");
            Resolve(CardsInHand[Number(Input) - 1]);
        });
    });
};

const ChooseTarget = (InputDescription, CardsInHand) => {
    return new Promise(Resolve => {
        process.stdin.resume();

        process.stdin.once("data", (Input) => {
            process.stdin.pause();
            console.log(InputDescription + CardsInHand[Number(Input) - 1].Name + "\n");
            Resolve(CardsInHand[Number(Input) - 1]);
        });
    });
};

const CheckForDeadEntities = (Entities) => {
    Entities.forEach((Entity, Index) => {
        if (Entity.Health <= 0) {
            Entities.splice(Index, 1);
        };
    });
};

module.exports = { ShuffleAllDecks, DrawInitialCards, ChooseCard, CheckForDeadEntities, ChooseTarget };