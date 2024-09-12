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
                bioma: "savana e rio",
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
                bioma: ["savana"],
                conviveCom: ["leao"]
            },
            leopardo: {
                tamanho: 2,
                bioma: ["savana"],
                conviveCom: ["leopardo"]
            },
            crocodilo: {
                tamanho: 3,
                bioma: ["rio"],
                conviveCom: ["crocodilo"]
            },
            macaco: {
                tamanho: 1,
                bioma: ["savana","floresta"],
                conviveCom: ["macaco","gazela","hipopotamo"]
            },
            gazela: {
                tamanho: 2,
                bioma: ["savana"],
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
        // Verificar se o animal especificado é válido como parte do objeto "animais"
        if (!animais.hasOwnProperty(animal)){
            resultado.erro = "Animal inválido"
            return resultado
        }

        // Verificar se a quantidade é válida
        if (quantidade <= 0 || Number.isNaN(quantidade)) {
            resultado.erro = "Quantidade inválida"
            return resultado
        }


        // Loop para analisar todos os recintos existentes
        for(let i=1;i<=recintosTotais;i++){
            espacoTotal = recintos[i].tamanho;
            
            qtdEspeciesDiferentes = Object.values(recintos[i].animais).length
            if (!qtdEspeciesDiferentes < 1) qtdEspeciesDiferentes-- // Subtrair a quantidade de espécies, mas não considerar caso ela seja negativa

            especiesDiferentes = Object.keys(recintos[i].animais) // Definir todos os animais que já estão dentro do recinto

            // Loop para analisar todas as espécies de animais no recinto especificado
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
                
            
            espacoLivre = espacoTotal - tamanhoOcupadoAnimaisRecinto - qtdEspeciesDiferentes - tamanhoAnimalSelecionado

            // DEBUG
            // console.log(`========== Recinto ${i} ==========`)
            // console.log("especiesDiferentes",especiesDiferentes)
            // console.log("animaisNoRecinto:",animaisNoRecinto)
            // console.log("QtdEspeciesDiferentes:",qtdEspeciesDiferentes)
            // console.log("tamanhoOcupado:",tamanhoOcupadoAnimaisRecinto)

            // VERIFICAÇÃO DE BIOMAS
            // Define a condição para checar se o animal especificado se encontra em um recinto em que se adapta ao bioma

            encontrarBiomaValido = animais[animal].bioma.some(value => recintos[i].bioma.includes(value))

            // Regra 4: Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
            if(
                animal === "hipopotamo" && 
                Object.keys(recintos[i].animais).length > 0 && 
                (!recintos[i].bioma.includes('savana') ||
                !recintos[i].bioma.includes('rio')) &&
                encontrarBiomaValido == true
            ){
                encontrarBiomaValido = false
                console.log("Mudou para o recinto:",i,true)
            }


            // Verifica se o animal se adapta ao bioma do recinto atual (se o bioma está incluso no array "biomas" do objeto "animais", ou se for string, verificar se a string faz parte do array)
            if(encontrarBiomaValido == true){
                //console.log("Recinto com bioma viável encontrado:",i,recintos[i].bioma, "habita:", animais[animal].bioma) // DEBUG
                // Verifica se o animal convive com os animais que já estão no recinto ou se o recinto não tiver animais
                if(animais[animal].conviveCom.some(value => recintos[i].animais.hasOwnProperty(value)) || Object.keys(recintos[i].animais).length === 0){
                    //console.log(true, i, animais[animal].conviveCom, recintos[i].animais,animal) // DEBUG
                    //console.log(`Animal "${animal}" convive com os animais "${animais[animal].conviveCom}",`,recintos[i].animais, "estão no recinto",i) // DEBUG
                    if (espacoLivre > -1){// Adiciona o recinto ao array de recintos viáveis se ele tiver espaço.
                        //console.log("Adicionado ao recinto.")
                        recintosViaveis.push(`Recinto ${i} (espaço livre: ${espacoLivre} total: ${espacoTotal})`) 
                        resultado.recintosViaveis = recintosViaveis
                    } //else console.log("XXX Não há espaço no recinto",i,`para ${quantidade+" "+animal}(s), espaço após a introdução do animal será`,espacoLivre,"! XXX") // DEBUG
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
