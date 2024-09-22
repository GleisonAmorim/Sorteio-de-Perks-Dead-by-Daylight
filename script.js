const perksComPesos = {
    'Ação Corretiva': 1,
    'Adrenalina': 4,
    'Agilidade': 5,
    'Alerta': 1,
    'Aliança Reprimida': 1,
    'Artimanha': 1,
    'Autodidata': 1,
    'Aumentar as Apostas': 1,
    'Babá': 1,
    'Boon: Exponencial': 1,
    'Boon: Iluminação': 1,
    'Boon: Passo Sombrio': 1,
    'Campeão da Luz': 1,
    'Camaradagem': 1,
    'Carne Escorregadia': 1,
    'Clarividência': 1,
    'Construído para Durar': 1,
    'Cura Reativa': 1,
    'Dance Comigo': 1,
    'De Cabeça': 1,
    'Deixado Para Trás': 1,
    'Distração': 1,
    'Dramaturgia': 1,
    'Duro na Queda': 3,
    'Em Alerta': 1,
    'Energia Potencial': 1,
    'Empatia': 1,
    'Escuta': 1,
    'Esperança': 1,
    'Espírito Calmo': 1,
    'Fama Acelerada': 1,
    'Farmácia': 1,
    'Feito para Isso': 1,
    'Finesse': 1,
    'Foco Interior': 1,
    'Força Interior': 1,
    'Hiperfoco': 1,
    'Ideia Fixa': 1,
    'Instinto de Saqueador': 1,
    'Inspiração de Bardo': 1,
    'Inquebrável': 1,
    'Libertação': 1,
    'Líder': 1,
    'Melhor Juntos': 1,
    'Medidas Desesperadas': 1,
    'Mina Explosiva': 1,
    'Mão Aberta': 1,
    'Manifesto Residual': 1,
    'Ninguém Fica Para Trás': 1,
    'Objeto de Obsessão': 1,
    'Off the Record': 1,
    'Pacto de Sangue': 1,
    'Parceiro de Cena': 1,
    'Pequena Caça': 1,
    'Pés Leves': 1,
    'Premonição': 1,
    'Proteção de Alma': 1,
    'Prove Se': 2,
    'Queda Equilibrada': 5,
    'Reviravolta': 1,
    'Resiliência': 3,
    'Sabotador': 1,
    'Sabedoria da Névoa': 1,
    'Sentido Obscuro': 1,
    'Segundo Folego': 1,
    'Solidariedade': 1,
    'Solução de Problemas': 1,
    'Superar': 1,
    'Tenacidade': 1,
    'Técnico': 1,
    'Trabalho em Equipe: Furtividade Coletiva': 1,
    'Vigilância': 1,
    'Visionário': 1,
    'Vontade de Ferro': 3,
    'Vínculo': 1,
    'Visão Estática': 1,
    'Vamos viver para sempre': 1,
    'Boom: Círculo Curativo': 1,
    'Granada de Luz': 1,
    'Isso Não Está Acontecendo': 1,
    'Líder': 1
};

const perksExclusivas = ['Agilidade', 'Queda Equilibrada', 'Duro na Queda', 'Arrancada Explosiva'];

// Defina aqui suas combinações favoritas
const combinacoesFavoritas = [
    ['Adrenalina', 'Dance Comigo', 'Rápida e silenciosa', 'Agilidade'],
    ['Distorção', 'Duro na queda', 'Deja vu', 'Prove Se'],
    ['Adrenalina', 'Esperança', 'Arrancada Explosiva', 'Resiliência'],
    //  ['Adrenalina', 'Esperança', 'Arrancada Explosiva', 'Resiliência']   
];

document.getElementById('sortearCombinadoBtn').addEventListener('click', () => {
    const quantidade = parseInt(document.getElementById('quantidadeSelect').value);
    const perkDisplay = document.getElementById('perkDisplay');

    // Adiciona a classe de animação
    perkDisplay.classList.add('spinning');

    setTimeout(() => {
        const perks = sortearPerks(quantidade);
        exibirPerks(perks);
        // Remove a classe de animação após a rotação
        perkDisplay.classList.remove('spinning');
    }, 1000); // O tempo deve ser igual ao da animação
});

function sortearPerks(quantidade) {
    // Define a chance de usar uma combinação favorita
    const usarFavorita = Math.random() < 0.5; // 50% de chance de usar uma combinação favorita

    // Se for usar uma combinação favorita, sorteia uma
    if (usarFavorita) {
        const combinacaoFavorita = combinacoesFavoritas[Math.floor(Math.random() * combinacoesFavoritas.length)];
        // Retorna apenas a quantidade solicitada
        return combinacaoFavorita.slice(0, quantidade);
    }

    // Caso contrário, faz o sorteio aleatório
    const perksSelecionadas = [];
    let perkExclusiva = null;

    // Sorteia uma perk exclusiva aleatória
    if (Math.random() < 1) { // Sempre sorteia uma perk exclusiva
        perkExclusiva = perksExclusivas[Math.floor(Math.random() * perksExclusivas.length)];
        perksSelecionadas.push(perkExclusiva);
    }

    const perksDisponiveis = Object.keys(perksComPesos).filter(perk => {
        return !perksSelecionadas.includes(perk) && !(perkExclusiva && perksExclusivas.includes(perk));
    });

    // Sorteia as outras perks
    while (perksSelecionadas.length < quantidade) {
        const perk = perksDisponiveis[Math.floor(Math.random() * perksDisponiveis.length)];
        if (!perksSelecionadas.includes(perk)) {
            perksSelecionadas.push(perk);
        }
    }

    return perksSelecionadas;
}

function exibirPerks(perks) {
    const perkDisplay = document.getElementById('perkDisplay');
    perkDisplay.innerHTML = '';

    perks.forEach(perk => {
        const perkElement = document.createElement('div');
        perkElement.classList.add('perk');
        perkElement.innerText = perk;
        perkDisplay.appendChild(perkElement);
    });
}
