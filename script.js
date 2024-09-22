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

const perksExclusivas = ['Agilidade', 'Queda Equilibrada', 'Duro na Queda', 'Arrancada Explosiva', 'Superar', 'Hit de sucesso'];

// Defina aqui suas combinações favoritas
const combinacoesFavoritas = [
    ['Adrenalina', 'Dance Comigo', 'Rápida e silenciosa', 'Agilidade'],
    ['Distorção', 'Duro na queda', 'Deja vu', 'Prove Se'],
    ['Adrenalina', 'Esperança', 'Arrancada Explosiva', 'Resiliência'],
    ['Libertação', 'Ataque Decisivo', 'Inquebrável', 'Tenacidade'],
    ['Intuição de Detetive', 'Mão Aberta', 'Small Game', 'Arrancada Explosiva'],
    ['Tenacidade', 'Inquebrável', 'Bate e volta', 'Disputa de forças'] ,
    ['Agilidade', 'Resiliência', 'Deja Vu', 'Prove-se']
    ['Better Together', 'Mão Aberta', 'Prove-se', 'Ação Corretiva'],
    ['Arrancada Explosiva', 'Resiliência', 'Medidas Desesperadas', 'Conseguiremos'],
    ['Prove-se', 'Libertação', 'Resiliência', 'Vontade de Ferro'],
    ['Segundo Folego', 'Libertação', 'Resiliência', 'Vontade de Ferro'],
    ['Agilidade', 'Rápida e Silenciosa', 'Vontade de ferro', 'Espírito Calmo'],
    ['Armadilha quimica', 'Granada de luz', 'Mina Explosiva', 'Escuta']

];

document.getElementById('sortearCombinadoBtn').addEventListener('click', () => {
    const quantidade = parseInt(document.getElementById('quantidadeSelect').value);
    const perkDisplay = document.getElementById('perkDisplay');

    if (isNaN(quantidade) || quantidade < 1 || quantidade > (perksComPesos.length + 1)) {
        alert('Por favor, selecione um número válido de perks.');
        return;
    }

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
    const usarFavorita = Math.random() < 0.5; // 50% de chance de usar uma combinação favorita

    if (usarFavorita) {
        const combinacaoFavorita = combinacoesFavoritas[Math.floor(Math.random() * combinacoesFavoritas.length)];
        return combinacaoFavorita.slice(0, quantidade);
    }

    const perksSelecionadas = new Set();

    // Sorteia uma perk exclusiva aleatória (se necessário)
    let perkExclusiva = null;
    if (Math.random() < 1) { // Sempre sorteia uma perk exclusiva
        perkExclusiva = perksExclusivas[Math.floor(Math.random() * perksExclusivas.length)];
        perksSelecionadas.add(perkExclusiva);
    }

    const perksDisponiveis = Object.keys(perksComPesos).filter(perk => {
        return !perksSelecionadas.has(perk) && !(perkExclusiva && perksExclusivas.includes(perk));
    });

    // Sorteia as outras perks, garantindo que não haja perks exclusivas
    while (perksSelecionadas.size < quantidade) {
        const perk = perksDisponiveis[Math.floor(Math.random() * perksDisponiveis.length)];
        perksSelecionadas.add(perk);
    }

    return Array.from(perksSelecionadas);
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
