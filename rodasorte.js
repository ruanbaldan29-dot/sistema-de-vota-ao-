const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ficheiro = "palavras.json";

function lerDados() {
  if (!fs.existsSync(ficheiro)) {
    return [];
  }
  const dados = fs.readFileSync(ficheiro);
  return JSON.parse(dados);
}

function guardarDados(dados) {
  fs.writeFileSync(ficheiro, JSON.stringify(dados, null, 2));
}

function validarPalavra(palavra) {
  return palavra.length > 0 && palavra.length <= 8;
}

function adicionarJogador() {
  rl.question("Nome do jogador: ", (nome) => {
    if (!nome) {
      console.log("❌ Nome inválido!");
      return menu();
    }

    rl.question("Palavra secreta (até 8 letras): ", (palavra) => {
      if (!validarPalavra(palavra)) {
        console.log("❌ Palavra inválida!");
        return menu();
      }

      let dados = lerDados();
      dados.push({ nome, palavra });

      guardarDados(dados);

      console.log("✅ Jogada registada!");
      menu();
    });
  });
}

function sortear() {
  let dados = lerDados();

  if (dados.length === 0) {
    console.log("❌ Não existem jogadas!");
    return menu();
  }

  const indice = Math.floor(Math.random() * dados.length);
  const vencedor = dados[indice];

  console.log("\n🎉 Palavra sorteada:", vencedor.palavra);
  console.log("🏆 Vencedor:", vencedor.nome);

  // ⚠️ Removemos a limpeza do ficheiro!
  // guardarDados([]);
  console.log("💾 As jogadas permanecem para a próxima rodada!\n");

  menu();
}

function menu() {
  console.log("\n=== RODA DA SORTE ===");
  console.log("1 - Adicionar jogador");
  console.log("2 - Sortear");
  console.log("0 - Sair");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1":
        adicionarJogador();
        break;
      case "2":
        sortear();
        break;
      case "0":
        console.log("👋 Adeus!");
        rl.close();
        break;
      default:
        console.log("❌ Opção inválida!");
        menu();
    }
  });
}

// Iniciar o programa
menu();