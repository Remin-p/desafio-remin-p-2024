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
        let recintosViaveis = [], espacoTotal, espacoLivre, qtdEspeciesDiferentes, especiesDiferentes, tamanhoOcupado, animaisNoRecinto, tamanhoOcupadoAnimaisRecinto = 0, tamanhoAnimal, tamanhoAnimalSelecionado, encontrarBiomaValido, animaisConvivem;

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
            if (!qtdEspeciesDiferentes < 1) qtdEspeciesDiferentes-- // Subtrair a quantidade de espécies, mas não considerar caso ela se tornará negativa

            especiesDiferentes = Object.keys(recintos[i].animais) // Definir todos os animais que já estão dentro do recinto

            // Loop para analisar todas as espécies de animais no recinto especificado
            for(let x=0;x<especiesDiferentes.length;x++){
                if(animais.hasOwnProperty(especiesDiferentes[x])){
                    animaisNoRecinto = recintos[i].animais[especiesDiferentes[x]]

                    tamanhoAnimal = animais[especiesDiferentes[x]].tamanho

                    tamanhoOcupado = animaisNoRecinto * tamanhoAnimal // Calcular o tamanho total que o animal está ocupando dentro do recinto, contando com a key "tamanho" definida no objeto "animais"
                    
                    tamanhoOcupadoAnimaisRecinto += tamanhoOcupado;
                }
            }
            // Considerar o animal especificado como uma espécie diferente caso haja multiplas espécies dentro do recinto
            if((!recintos[i].animais.hasOwnProperty(animal)) && Object.entries(recintos[i].animais).length > 0) {
                qtdEspeciesDiferentes++
            }
            
            // Considerar o(s) animal(is) que já estão dentro do recinto e calcular o tamanho que ele(s) ocupará(ão)
            tamanhoAnimalSelecionado = quantidade * animais[animal].tamanho 
            
            espacoLivre = espacoTotal - tamanhoOcupadoAnimaisRecinto - qtdEspeciesDiferentes - tamanhoAnimalSelecionado

            //Verificar se o animal especificado irá para um recinto em que se adapta ao bioma
            encontrarBiomaValido = animais[animal].bioma.some(value => recintos[i].bioma.includes(value))

            // Verificar se o animal especificado irá para um recinto com animais que possam conviver com ele
            animaisConvivem = (animais[animal].conviveCom.some(value => especiesDiferentes.includes(value)) || especiesDiferentes.length === 0)
            
            // Regra 4: Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
            if(animal === "hipopotamo" && especiesDiferentes.length > 0 && !recintos[i].bioma.includes('savana e rio') && animaisConvivem == true){
                animaisConvivem = false
            }

            // Regra 5: Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
            if(animal === "macaco" && quantidade == 1 && especiesDiferentes.length == 0){
                animaisConvivem = false
            }

            // Após todas as verificações, inserir o animal no recinto
            if(encontrarBiomaValido === true && animaisConvivem === true && espacoLivre >= 0){
                recintosViaveis.push(`Recinto ${i} (espaço livre: ${espacoLivre} total: ${espacoTotal})`) 
                resultado.recintosViaveis = recintosViaveis
            }
            
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
