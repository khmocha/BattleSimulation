const Cards = require("./Cards.js");
const { Allies, Enemies } = require("./Entities.js"); 
const { 
    ShuffleAllDecks, DrawInitialCards, ChooseCard, ChooseTarget, CheckForDeadEntities
} = require("./Utilities.js"); 

ShuffleAllDecks(Allies);
ShuffleAllDecks(Enemies);

DrawInitialCards(Allies);
DrawInitialCards(Enemies);

let BattleVariables = {
    Allies, Enemies, Target: null
};

const SimulateBattle = async () => {
    console.log("Battle starts now!\n");

    let TurnSide = Allies;

    while (Allies.length > 0 && Enemies.length > 0) {
        if (TurnSide === Allies) {
            for (const Ally of Allies) {
                console.log("Available enemies to attack:");
    
                Enemies.forEach((Enemy, Index) => {
                    console.log(`${Index + 1}. ${Enemy.Name} - Health: ${Enemy.Health}`);
                });

                console.log("");
    
                console.log(Ally.Name + " available moves:");
    
                Ally.CardsInHand.forEach((Card, Index) => {
                    console.log(
                        `${Index + 1}. ${Card} - Fury: ${Cards[Card].Fury}. ${Cards[Card].Description}`
                    );
                });
    
                console.log("\nPlease choose a card by entering a number.");
    
                const ChosenCard = await ChooseCard("\nYou chose: ", Ally.CardsInHand);
                
                console.log("Please choose a target by entering a number.");
    
                BattleVariables.Target = await ChooseTarget("\nYou chose ", Enemies);
    
                await Cards[ChosenCard].Activate(BattleVariables);
                
                CheckForDeadEntities(Allies);
                CheckForDeadEntities(Enemies);

                console.log("-------------------------------------------------\n");
            };

            TurnSide = Enemies;
        } else {
            for (const Enemy of Enemies) {
                console.log(Enemy.Name + " is choosing a card and target...\n");

                console.log("Available allies to attack:");

                Allies.forEach((Enemy, Index) => {
                    console.log(`${Index + 1}. ${Enemy.Name} - Health: ${Enemy.Health}`);
                });

                console.log("");

                BattleVariables.Target = Allies[Math.floor(Math.random() * Allies.length)];

                console.log("Enemy chose " + BattleVariables.Target.Name + "\n");

                console.log(Enemy.Name + " available moves:");

                Enemy.CardsInHand.forEach((Card, Index) => {
                    console.log(
                        `${Index + 1}. ${Card} - Fury: ${Cards[Card].Fury}. ${Cards[Card].Description}`
                    );
                });

                console.log("");

                const ChosenCard = Enemy.CardsInHand[Math.floor(Math.random() * Enemy.CardsInHand.length)];

                console.log("Enemy chose " + ChosenCard + "\n");

                await Cards[ChosenCard].Activate(BattleVariables);

                console.log("-------------------------------------------------\n");
            }

            TurnSide = Allies;
        }
    };
};

SimulateBattle();