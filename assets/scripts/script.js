document.addEventListener("DOMContentLoaded", () => {
    function getHoje() {
        const hoje = new Date();
        return hoje.toISOString().split("T")[0];
    }

    async function mostrarCuriosidade() {
        const dataHoje = getHoje();
        let historico = JSON.parse(localStorage.getItem("historico")) || {};

        if (!historico[dataHoje]) {
            try {
                const resposta = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
                const dados = await resposta.json();
                historico[dataHoje] = dados.text;
                localStorage.setItem("historico", JSON.stringify(historico));
            } catch (erro) {
                historico[dataHoje] = "Curiosidade não carregada. Verifique sua conexão com a internet.";
            }
        }

        document.getElementById("curiosidade").innerText = historico[dataHoje];

        const total = Object.keys(historico).length;
        document.getElementById("estatisticas").innerText =
            `Você já leu ${total} curiosidade${total > 1 ? 's' : ''} diferente${total > 1 ? 's' : ''}!`;

        mostrarHistorico(historico);
    }

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

    function alternarTema() {
        document.body.classList.toggle("modo-escuro");
        const temaAtual = document.body.classList.contains("modo-escuro") ? "escuro" : "claro";
        localStorage.setItem("tema", temaAtual);
    }

    function aplicarTemaSalvo() {
        const temaSalvo = localStorage.getItem("tema");
        if (temaSalvo === "escuro") {
            document.body.classList.add("modo-escuro");
        }
    }

    // Executa tudo
    aplicarTemaSalvo();
    mostrarCuriosidade();

    // Adiciona o event listener ao botão
    document.querySelector("button#tema").addEventListener("click", alternarTema);
});
