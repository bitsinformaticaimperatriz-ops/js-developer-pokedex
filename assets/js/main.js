const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detailOverlay = document.getElementById('pokemonDetailOverlay')
const detailCard = document.getElementById('detailCard')

const maxRecords = 151
const limit = 10
let offset = 0;

// Cache local para armazenar os detalhes dos Pokémons carregados
let pokemonsCache = [];

function convertPokemonToLi(pokemon) {
    // Adicionamos o "onclick" passando o número do Pokémon
    return `
        <li class="pokemon ${pokemon.type}" onclick="openPokemonDetail(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Guardamos os novos pokémons carregados no nosso cache
        pokemonsCache = [...pokemonsCache, ...pokemons];
        
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

/* =========================================
   LÓGICA DO CARD DE DETALHES (MODAL/TABS)
   ========================================= */

function openPokemonDetail(pokemonId) {
    // Busca o Pokémon no cache carregado
    const pokemon = pokemonsCache.find(p => p.number === pokemonId);
    if (!pokemon) return;

    // Calcula o total de Status
    const totalStats = Object.values(pokemon.stats).reduce((acc, curr) => acc + curr, 0);

    // Monta o template do card com as abas conforme o mockup
    detailCard.className = `detail-card ${pokemon.type}`;
    detailCard.innerHTML = `
        <div class="detail-card-header">
            <button class="back-button" onclick="closePokemonDetail()">&larr;</button>
            <div class="name-row">
                <h2>${pokemon.name}</h2>
                <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
            </div>
            <div class="types-row">
                ${pokemon.types.map(type => `<span class="type-badge">${type}</span>`).join('')}
            </div>
        </div>

        <div class="detail-card-body">
            <img class="pokemon-img" src="${pokemon.photo}" alt="${pokemon.name}">
            
            <!-- Menu de Abas -->
            <div class="tab-menu">
                <button class="tab-button active" onclick="switchTab(event, 'about')">About</button>
                <button class="tab-button" onclick="switchTab(event, 'stats')">Base Stats</button>
            </div>

            <!-- Conteúdo: About -->
            <div id="about" class="tab-content active">
                <div class="info-row">
                    <span class="info-label">Height</span>
                    <span class="info-value">${pokemon.height} m</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Weight</span>
                    <span class="info-value">${pokemon.weight} kg</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Abilities</span>
                    <span class="info-value">${pokemon.abilities.join(', ')}</span>
                </div>
            </div>

            <!-- Conteúdo: Base Stats -->
            <div id="stats" class="tab-content">
                ${Object.entries(pokemon.stats).map(([statName, statValue]) => {
                    const percentage = Math.min((statValue / 150) * 100, 100);
                    // Deixa a cor da barrinha combinando com o tipo dominante do pokemon
                    const barColor = `var(--${pokemon.type}, #48d0b0)`;
                    return `
                        <div class="stat-row">
                            <span class="stat-label">${statName.replace('special-', 'sp. ')}</span>
                            <span class="stat-value">${statValue}</span>
                            <div class="stat-bar-bg">
                                <div class="stat-bar-fill ${pokemon.type}" style="width: ${percentage}%;"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
                <div class="stat-row">
                    <span class="stat-label">Total</span>
                    <span class="stat-value">${totalStats}</span>
                    <div class="stat-bar-bg">
                        <div class="stat-bar-fill ${pokemon.type}" style="width: ${Math.min((totalStats / 600) * 100, 100)}%;"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    detailOverlay.style.display = 'flex';
}

// Fechar o card
function closePokemonDetail() {
    detailOverlay.style.display = 'none';
}

// Alternar entre abas (About / Base Stats)
function switchTab(event, tabId) {
    // Remove classe ativa de todos os botões e conteúdos do modal atual
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // Ativa o botão clicado e o container correspondente
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Fechar modal clicando fora do card de detalhes
window.addEventListener('click', (event) => {
    if (event.target === detailOverlay) {
        closePokemonDetail();
    }
});