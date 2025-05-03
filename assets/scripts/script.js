document.addEventListener("DOMContentLoaded", () => {
    // Função para obter a data de hoje no formato YYYY-MM-DD
    function getHoje() {
        const hoje = new Date();
        const dia = hoje.getDate().toString().padStart(2, '0'); // Obtemos o dia no formato correto
        const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); // Mes ajustado (Jan é 0, então somamos 1)
        const ano = hoje.getFullYear(); // Ano com 4 dígitos
        return `${ano}-${mes}-${dia}`; // Formato YYYY-MM-DD
    }
    // Função para exibir a curiosidade de hoje
    async function mostrarCuriosidade() {
        const dataHoje = getHoje();
        let historico = JSON.parse(localStorage.getItem("historico")) || {};

        // Verificando se já existe curiosidade para hoje
        if (!historico[dataHoje]) {
            try {
                // Se o histórico tiver dados de amanhã (ou dados errados), vamos limpar o histórico
                if (Object.keys(historico).length > 0 && Object.keys(historico)[0] !== dataHoje) {
                    limparHistorico(); // Limpa o histórico se a data estiver fora de ordem
                }

                const resposta = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
                const dados = await resposta.json();

                // Adiciona a curiosidade ao histórico
                historico[dataHoje] = dados.text;
                localStorage.setItem("historico", JSON.stringify(historico));
            } catch (erro) {
                console.error("Erro na requisição da API:", erro);
                historico[dataHoje] = "Curiosidade não carregada. Verifique sua conexão com a internet.";
            }
        }

        // Exibe a curiosidade
        document.getElementById("curiosidade").innerText = historico[dataHoje];

        // Atualiza as estatísticas
        const total = Object.keys(historico).length;
        document.getElementById("estatisticas").innerText =
            `You've already read ${total} different${total > 1 ? 's' : ''} curiosity${total > 1 ? 's' : ''}!`;

        // Exibe o histórico corretamente
        mostrarHistorico(historico);
    }

    // Função para mostrar o histórico de curiosidades passadas
    function mostrarHistorico(historico) {
        const lista = document.getElementById("historico");
        lista.innerHTML = "";

        const datas = Object.keys(historico).sort((a, b) => new Date(b) - new Date(a));
        for (const data of datas) {
            const item = document.createElement("li");
            item.innerText = `${data}: ${historico[data]}`;
            lista.appendChild(item);
        }
    }

    // Função para alternar entre o tema claro e escuro
    function alternarTema() {
        document.body.classList.toggle("modo-escuro");
        const temaAtual = document.body.classList.contains("modo-escuro") ? "escuro" : "claro";
        localStorage.setItem("tema", temaAtual);
    }

    // Função para aplicar o tema salvo no LocalStorage
    function aplicarTemaSalvo() {
        const temaSalvo = localStorage.getItem("tema");
        if (temaSalvo === "escuro") {
            document.body.classList.add("modo-escuro");
        }
    }

    // Função para exibir ou esconder o histórico ao clicar no botão
    function exibirHistorico() {
        const historicoContainer = document.getElementById("historico-container");
        historicoContainer.style.display = historicoContainer.style.display === "none" ? "block" : "none";
    }

    // Executa tudo ao carregar a página
    aplicarTemaSalvo();
    mostrarCuriosidade();

    // Adiciona os event listeners aos botões
    document.querySelector("button#tema").addEventListener("click", alternarTema);
    document.querySelector("button#ver-historico").addEventListener("click", exibirHistorico);
});
