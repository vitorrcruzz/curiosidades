const curiosidades = [
    "A língua de uma baleia-azul pode pesar até 3,6 toneladas — o equivalente a cerca de 6 elefantes adultos médios.",
    "Se você pudesse dirigir verticalmente, chegaria ao espaço em cerca de 1 hora a 100 km/h.",
    "As formigas não dormem, mas têm ciclos de descanso com momentos de inatividade.",
    "O coração de um camarão fica localizado na sua cabeça.",
    "Uma colher de chá de estrela de nêutrons teria uma massa de 6 bilhões de toneladas.",
    "A Terra já teve um dia de 18 horas há 1,4 bilhão de anos.",
    "O número de bactérias na boca humana é maior do que o número de pessoas na Terra.",
    "Saturno é tão leve (comparativamente) que flutuaria em uma piscina gigante de água — se fosse possível.",
    "O relâmpago é cinco vezes mais quente do que a superfície do Sol."
];
function getHoje() {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0]; // yyyy-mm-dd
}
function mostrarCuriosidade() {
    const dataHoje = getHoje();
    let historico = JSON.parse(localStorage.getItem("historico")) || {};

    if (!historico[dataHoje]) {
        const index = Math.floor(Math.random() * curiosidades.length);
        historico[dataHoje] = curiosidades[index];
        localStorage.setItem("historico", JSON.stringify(historico));
    }

    const curiosidadeHoje = historico[dataHoje];
    document.getElementById("curiosidade").innerText = curiosidadeHoje;

    const total = Object.keys(historico).length;
    document.getElementById("estatisticas").innerText = `Você já leu ${total} curiosidade${total > 1 ? 's' : ''} diferente${total > 1 ? 's' : ''}!`;
}
document.getElementById("verAntigas").addEventListener("click", () => {
    const historico = JSON.parse(localStorage.getItem("historico")) || {};
    const lista = Object.entries(historico).map(([data, curiosidade]) => `${data}: ${curiosidade}`);
    alert("Curiosidades passadas:\n\n" + lista.join("\n"));
});
document.getElementById("toggleTheme").addEventListener("click", () => {
    const atual = document.documentElement.getAttribute("data-theme");
    const novo = atual === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", novo);
    localStorage.setItem("tema", novo);
});
function aplicarTemaSalvo() {
    const tema = localStorage.getItem("tema") || "light";
    document.documentElement.setAttribute("data-theme", tema);
}

aplicarTemaSalvo();
mostrarCuriosidade();