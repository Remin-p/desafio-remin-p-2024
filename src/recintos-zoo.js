class RecintosZoo {

    analisaRecintos(animal, quantidade) {

        const recintos = {
            1: {
                bioma: "savana",
                tamanho: 10,
                animais: {
                    macaco: 3
                }
            },
            2: {
                bioma: "floresta",
                tamanho: 5,
                animais: {}
            },
            3: {
                bioma: ["savana","rio"],
                tamanho: 7,
                animais: {
                    gazela: 1
                }
            },
            4: {
                bioma: "rio",
                tamanho: 8,
                animais: {}
            },
            5: {
                bioma: "savana",
                tamanho: 9,
                animais: {
                    leao: 1
                }
            }
        }
        const animais = {
            leao: {
                tamanho: 3,
                bioma: "savana"
            },
            leopardo: {
                tamanho: 2,
                bioma: "savana"
            },
            crocodilo: {
                tamanho: 3,
                bioma: "rio"
            },
            macaco: {
                tamanho: 1,
                bioma: ["savana","floresta"]
            },
            gazela: {
                tamanho: 2,
                bioma: "savana"
            },
            hipopotamo: {
                tamanho: 4,
                bioma: ["savana","rio"]
            }
        }
        
        
        
    }

}

export { RecintosZoo as RecintosZoo };
