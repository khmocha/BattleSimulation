const Cards = {
    "Stab": {
        Description: "Deal 5 damage to a target.",
        Activate: async (BattleVariables) => {
            const Damage = 5;

            BattleVariables.Target.Health -= Damage;

            if (BattleVariables.Target.Side === "Allies") {
                BattleVariables.AlliesHealth -= Damage;
            } else {
                BattleVariables.EnemiesHealth -= Damage;
            }
        }
    }
};

module.exports = Cards;