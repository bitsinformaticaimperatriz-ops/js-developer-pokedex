
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    // Usando a imagem oficial de alta qualidade (Artwork) para o detalhe ficar idêntico ao mockup
    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default

    // Conversões físicas (decímetros -> metros, hectogramas -> kg)
    pokemon.height = (pokeDetail.height / 10).toFixed(1);
    pokemon.weight = (pokeDetail.weight / 10).toFixed(1);

    // Habilidades
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

    // Atributos de batalha (Stats)
    pokeDetail.stats.forEach((statSlot) => {
        pokemon.stats[statSlot.stat.name] = statSlot.base_stat;
    });

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
