class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        // Definir variáveis
        const recintos = {
            1: {
                bioma: "savana",
                tamanho: 10,
                animais: {
                    macaco: 3,
                    gazela: 2 // APENAS PARA TESTES, REMOVER APÓS TERMINAR
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
        let resultado = {}
        const recintosTotais = Object.keys(recintos).length;
        let recintosViaveis = [], espacoTotal, espacoLivre, qtdEspeciesDiferentes, especiesDiferentes, tamanhoOcupado, animaisNoRecinto, tamanhoOcupadoFinal = 0, tamanhoAnimal;

        // Objetos em JavaScript são case-sensitive
        animal = animal.toLowerCase()

        // Quantidade não deve ser processada caso não seja um número.
        quantidade = parseInt(quantidade)

        // VERIFICAÇÕES
        // Verificar se a quantidade é válida
        if (quantidade <= 0 || Number.isNaN(quantidade)) {
            resultado.erro = "Quantidade inválida"
            return resultado
        }

        // Verificar se o animal especificado é válido como parte do objeto "animais"
        if (!animais.hasOwnProperty(animal)){
            resultado.erro = "Animal inválido"
            return resultado
        }

        // Loop para analisar todos os recintos existentes
        for(let i=1;i<=recintosTotais;i++){
            espacoTotal = recintos[i].tamanho;
            
            qtdEspeciesDiferentes = Object.values(recintos[i].animais).length
            if (!qtdEspeciesDiferentes < 1) qtdEspeciesDiferentes-- // Subtrair a quantidade de espécies, mas não considerar caso ela seja negativa

            especiesDiferentes = Object.keys(recintos[i].animais) // Definir todos os animais que já estão dentro do recinto

            for(let x=0;x<especiesDiferentes.length;x++){
                if(animais.hasOwnProperty(especiesDiferentes[x])){
                    animaisNoRecinto = recintos[i].animais[especiesDiferentes[x]]

                    tamanhoAnimal = animais[especiesDiferentes[x]].tamanho

                    tamanhoOcupado = animaisNoRecinto * tamanhoAnimal // Calcular o tamanho total que o animal está ocupando dentro do recinto, contando com a key "tamanho" definida no objeto "animais"
                    
                    tamanhoOcupadoFinal += tamanhoOcupado;

                    console.log(`##### Espécie ${especiesDiferentes[x]} do Recinto ${i} #####`)
                    console.log("animaisNoRecinto:",animaisNoRecinto)
                    console.log("tamanhoOcupado:",tamanhoOcupado)
                    console.log("tamanhoOcupadoFinal:",tamanhoOcupadoFinal)
                    console.log("##########")
                }
            }
                
            espacoLivre = espacoTotal - tamanhoOcupadoFinal - qtdEspeciesDiferentes // TODO: Mudar isso

            console.log(`========== Recinto ${i} ==========`)
            console.log("especiesDiferentes",especiesDiferentes)
            console.log("animaisNoRecinto:",animaisNoRecinto)
            console.log("QtdEspeciesDiferentes:",qtdEspeciesDiferentes)
            console.log("tamanhoOcupado:",tamanhoOcupadoFinal)

            if (quantidade <= espacoLivre){// Adiciona o recinto ao array de recintos viáveis se ele for viável
                recintosViaveis.push(`Recinto ${i} (espaço livre: ${espacoLivre} total: ${espacoTotal})`) 
                resultado.recintosViaveis = recintosViaveis
            }

            // Redefinir a variável após o final das contas
            animaisNoRecinto = 0
            tamanhoOcupado = 0 
            tamanhoOcupadoFinal = 0
        }
        if (recintosViaveis.length < 1) resultado.erro = "Não há recinto viável"

        return resultado
    }

}

export { RecintosZoo as RecintosZoo };
