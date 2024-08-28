const Cards = require("./Cards.js");
const { Allies, Enemies } = require("./Entities.js"); 
const { GetHealthSum, ShuffleAllDecks, DrawInitialCards, ChooseCard } = require("./Utilities.js"); 

ShuffleAllDecks(Allies);
ShuffleAllDecks(Enemies);

DrawInitialCards(Allies);
DrawInitialCards(Enemies);

let BattleVariables = {
    Allies, Enemies, Target: Enemies.B, AlliesHealth: GetHealthSum(Allies), EnemiesHealth: GetHealthSum(Enemies)
};

const SimulateBattle = async () => {
    console.log("Battle starts now!\n");

    while (BattleVariables.AlliesHealth > 0 && BattleVariables.EnemiesHealth > 0) {
        for (const Ally of Object.values(Allies)) {
            console.log(Ally.Name + " available moves:");

            Ally.CardsInHand.forEach((Card, Index) => {
                console.log(`${Index + 1}. ${Card} - ${Cards[Card].Description}`);
            });

            console.log("\nPlease choose a card by entering a number.");

            const ChosenCard = await ChooseCard("\nYou chose: ", Ally.CardsInHand);

            await Cards[ChosenCard].Activate(BattleVariables);
            
            console.log("\n" + BattleVariables.Target.Health + " " + BattleVariables.EnemiesHealth + "\n");
        };
    };
};

SimulateBattle();