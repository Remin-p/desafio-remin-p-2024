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
                    leao: 1
                }
            }
        }
        const animais = {
            leao: {
                tamanho: 3,
                bioma: "savana",
                conviveCom: ["leao"]
            },
            leopardo: {
                tamanho: 2,
                bioma: "savana",
                conviveCom: ["leopardo"]
            },
            crocodilo: {
                tamanho: 3,
                bioma: "rio",
                conviveCom: ["crocodilo"]
            },
            macaco: {
                tamanho: 1,
                bioma: ["savana","floresta"],
                conviveCom: ["macaco","gazela","hipopotamo"]
            },
            gazela: {
                tamanho: 2,
                bioma: "savana",
                conviveCom: ["macaco","gazela","hipopotamo"]
            },
            hipopotamo: {
                tamanho: 4,
                bioma: ["savana","rio"],
                conviveCom: ["macaco","gazela","hipopotamo"]
            }
        }
        let resultado = {}
        const recintosTotais = Object.keys(recintos).length;
        let recintosViaveis = [], espacoTotal, espacoLivre, qtdEspeciesDiferentes, especiesDiferentes, tamanhoOcupado, animaisNoRecinto, tamanhoOcupadoAnimaisRecinto = 0, tamanhoAnimal, tamanhoAnimalSelecionado, encontrarBiomaValido;

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
                    
                    tamanhoOcupadoAnimaisRecinto += tamanhoOcupado;

                    // DEBUG
                    // console.log(`##### Espécie ${especiesDiferentes[x]} do Recinto ${i} #####`)
                    // console.log("animaisNoRecinto:",animaisNoRecinto)
                    // console.log("tamanhoOcupado:",tamanhoOcupado)
                    // console.log("tamanhoOcupadoAnimaisRecinto:",tamanhoOcupadoAnimaisRecinto)
                    // console.log("##########")
                }
            }
            // Considerar o animal especificado como uma espécie diferente caso haja multiplas espécies dentro do recinto
            if((!recintos[i].animais.hasOwnProperty(animal)) && Object.entries(recintos[i].animais).length > 0) {
                qtdEspeciesDiferentes++
            }

            
            // Considerar o(s) animal(is) que já estão dentro do recinto e calcular o tamanho que ele(s) ocupará(ão)
            tamanhoAnimalSelecionado = quantidade * animais[animal].tamanho 
                
            //
            espacoLivre = espacoTotal - tamanhoOcupadoAnimaisRecinto - qtdEspeciesDiferentes - tamanhoAnimalSelecionado

            // DEBUG
            // console.log(`========== Recinto ${i} ==========`)
            // console.log("especiesDiferentes",especiesDiferentes)
            // console.log("animaisNoRecinto:",animaisNoRecinto)
            // console.log("QtdEspeciesDiferentes:",qtdEspeciesDiferentes)
            // console.log("tamanhoOcupado:",tamanhoOcupadoAnimaisRecinto)

            // VERIFICAÇÃO DE BIOMAS
            // Verifica se o animal se adapta ao bioma do recinto atual (se o bioma está incluso no array "biomas" do objeto "animais", ou se for string, verificar se a string faz parte do array)
            if(Array.isArray(animais[animal].bioma)){
                encontrarBiomaValido = animais[animal].bioma.some(value => (recintos[i].bioma).includes(value))
            } else {
                encontrarBiomaValido = recintos[i].bioma.includes(animais[animal].bioma)
            }

            if(encontrarBiomaValido == true){
                console.log("Recinto com bioma viável encontrado:",i,recintos[i].bioma, "habita:", animais[animal].bioma) // DEBUG
                if (espacoLivre > -1){// Adiciona o recinto ao array de recintos viáveis se ele tiver espaço.
                    recintosViaveis.push(`Recinto ${i} (espaço livre: ${espacoLivre} total: ${espacoTotal})`) 
                    resultado.recintosViaveis = recintosViaveis
                }
            }
            
            // DEBUG
            // console.log("Biomas que o animal habita:",animais[animal].bioma)
            // console.log("Bioma do recinto:",recintos[i].bioma)

            
            // Redefinir as variáveis após o final das contas
            animaisNoRecinto = 0
            tamanhoOcupado = 0 
            tamanhoOcupadoAnimaisRecinto = 0
            espacoLivre = 0
        }
        if (recintosViaveis.length < 1) resultado.erro = "Não há recinto viável"

        return resultado
    }

}

export { RecintosZoo as RecintosZoo };
