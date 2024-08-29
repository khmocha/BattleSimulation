const Cards = {
    "Stab": {
        Description: "Deal 5 damage to a target.",
        Fury: 0,
        Activate: async (BattleVariables) => {
            BattleVariables.Target.Health -= 5;
        }
    }
};

module.exports = Cards;