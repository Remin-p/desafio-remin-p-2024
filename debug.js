import { RecintosZoo } from "./src/recintos-zoo.js";

const runZoo = new RecintosZoo;

let allAnimals = ["leao","leopardo","crocodilo","macaco","gazela","hipopotamo","unicornio"]


for(let i = 0;i <= 2;i++){
    console.log(`\n+++++ Teste com quantidade ${i} +++++\n`)
    for(let x = 0;x<allAnimals.length;x++){
        console.log(`\n===== Animal ${allAnimals[x]}, quantidade ${i} =====`)
        console.log(runZoo.analisaRecintos(allAnimals[x],i));
    }
}


//console.log(runZoo.analisaRecintos("leao",2))