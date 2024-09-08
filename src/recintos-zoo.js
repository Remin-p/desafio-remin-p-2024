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
        let recintosViaveis = [], espacoTotal, espacoLivre, qtdEspeciesDiferentes, especiesDiferentes, tamanhoOcupado;

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
            
            qtdEspeciesDiferentes = Object.values(recintos[i].animais).length - 1 // Considerar um espaço extra como ocupado para quando há mais de uma espécie no recinto

            especiesDiferentes = Object.keys(recintos[i].animais) // Definir todos os animais que já estão dentro do recinto

            if(animais.hasOwnProperty(especiesDiferentes)){
                tamanhoOcupado = recintos[i].animais[especiesDiferentes] * animais[especiesDiferentes].tamanho // Calcular o tamanho total que o animal está ocupando dentro do recinto, contando com a key "tamanho" definida no objeto "animais"
            }

            espacoLivre = espacoTotal - tamanhoOcupado - qtdEspeciesDiferentes // TODO: Mudar isso
            
            if (quantidade <= espacoLivre){// Adiciona o recinto ao array de recintos viáveis se ele for viável
                recintosViaveis.push(`Recinto ${i} (espaço livre: ${espacoLivre} total: ${espacoTotal})`) 
                resultado.recintosViaveis = recintosViaveis
            }

            if (recintosViaveis.length < 1) resultado.erro = "Não há recinto viável"
        }
        return resultado
    }

}

export { RecintosZoo as RecintosZoo };
