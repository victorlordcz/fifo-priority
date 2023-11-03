const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class FilaFIFO {
    constructor() {
        this.prioritaria = [];
        this.normal = [];
        this.consecutivas = 0;
    }

    enfileirar(tipo, elementos) {
        elementos.forEach(elemento => {
            if (tipo === 'prioritario') {
                this.prioritaria.push(elemento);
            } else {
                this.normal.push(elemento);
            }
        });
    }

    desenfileirar() {
        if (this.prioritaria.length > 0) {
            if (this.consecutivas < 2) {
                this.consecutivas++;
                return this.prioritaria.shift();
            } else {
                this.consecutivas = 0;
                return this.normal.shift();
            }
        } else if (this.normal.length > 0) {
            this.consecutivas = 0;
            return this.normal.shift();
        } else {
            return null;
        }
    }

    mostrarFilas() {
        console.log("Fila Prioritária: ", this.prioritaria);
        console.log("Fila Normal: ", this.normal);
    }
}

const fila = new FilaFIFO();

function menu() {
    rl.question("Escolha uma opção:\n1. Inserir elemento(s)\n2. Retirar elemento\n3. Sair\n", function (opcao) {
        switch (opcao) {
            case '1':
                rl.question("Insira o tipo (prioritario ou normal): ", function (tipo) {
                    rl.question("Insira os elementos separados por vírgula: ", function (elementos) {
                        const elementosArray = elementos.split(',').map(elemento => elemento.trim());
                        fila.enfileirar(tipo, elementosArray);
                        fila.mostrarFilas();
                        menu();
                    });
                });
                break;
            case '2':
                const elementoRemovido = fila.desenfileirar();
                if (elementoRemovido) {
                    console.log("Elemento removido:", elementoRemovido);
                } else {
                    console.log("Não há elementos para retirar.");
                }
                fila.mostrarFilas();
                menu();
                break;
            case '3':
                rl.close();
                break;
            default:
                console.log("Opção inválida.");
                menu();
                break;
        }
    });
}

menu();