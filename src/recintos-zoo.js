class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        // Definir variáveis
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
                    leao: 1,
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
        let resultado = {}
        const recintosTotais = Object.keys(recintos).length;
        let recintosViaveis = [], espacoTotal, espacoLivre, animaisOcupandoEspaco;

        // Verifica se o animal especificado é válido como parte do objeto "animais"
        if (!animais.hasOwnProperty(animal)){
            resultado.erro = "Animal inválido"
            console.log(resultado)
            return resultado
        }
        
        // Loop para analisar todos os recintos existentes
        for(let i=1;i<=recintosTotais;i++){
            espacoTotal = recintos[i].tamanho

            animaisOcupandoEspaco = Object.values(recintos[i].animais) // Transformar em um array com a quantidade dos animais no recinto

            animaisOcupandoEspaco.reduce((acc, currVal) => {return acc + currVal}, 0) // Transformar o array em uma variável inteira

            // TODO: contar com o tamanho dos animais ao invés da quantidade
            
            espacoLivre = espacoTotal - animaisOcupandoEspaco 
            
            if (quantidade < recintos[i].tamanho){
                recintosViaveis.push(`Recinto ${i} (espaço livre: ${espacoLivre} total: ${espacoTotal})`)
                resultado.recintosViaveis = recintosViaveis
            }

            if (recintosViaveis.length < 1) resultado.erro = "Não há recinto viável"
        }
        console.log(resultado)

        return resultado
    }

}

export { RecintosZoo as RecintosZoo };
