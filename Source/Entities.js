const Allies = {
    A: {
        Name: "Main Character",
        Side: "Allies",
        Health: 100,
        Fury: 0,
        MaxFury: 10,
        Deck: [
            "Stab", "Stab", "Stab", "Stab", "Stab", "Stab"
        ],
        CardsInHand: []
    }
};

const Enemies = {
    B: {
        Name: "Enemy 1",
        Side: "Enemies",
        Health: 100,
        Fury: 0,
        MaxFury: 10,
        Deck: [
            "Stab", "Stab", "Stab", "Stab"
        ],
        CardsInHand: []
    }
};

module.exports = { Allies, Enemies };