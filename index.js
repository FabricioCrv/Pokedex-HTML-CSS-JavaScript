const pokedex = document.getElementById('pokedex');

console.log(pokedex);

const getPokemon = () => {
    //coletando todos os pokemons do PokéAPI
    const promises = []; 
    for (i = 387; i <= 493; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        promises.push(fetch(url).then((res) => res.json()));
    }
    //permitindo que toda a coleta seja feita em paralela da outra
    Promise.all(promises).then(results => {
    //iterando sobre cada resultado para o formato escolhido
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')
        }));
        displayPokemon(pokemon);
    });
};

//criando o display para cada pokemon do jogo
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(
        (pkmn) => `
        <li class ="card">
            <img class="card-image" src="${pkmn.image}"/>
            <h2 class="card-title">${pkmn.id}. ${pkmn.name}</h2>
            <p class="card-subtitle">Type: ${pkmn.type}</p>
        </li>
        `
    )
    .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

getPokemon();

