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