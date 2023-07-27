const pokedex = document.getElementById('pokedex');
const pokeCache = {};
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
        <li class ="card" onclick = "selectPokemon(${pkmn.id})">
            <img class="card-image" src="${pkmn.image}"/>
            <h2 class="card-title">${pkmn.id}. ${pkmn.name}</h2>
            <p class="card-subtitle">Type: ${pkmn.type}</p>
        </li>
        `
    )
    .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

//criando um popup que mostra informações extras de um pokemon para o usuário

const selectPokemon = async (id) => {
    //para o site não ficar criando um novo pedido na rede cada vez que clicar no mesmo pokemon
    if (!pokeCache[id]){
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pkmn = await res.json();
        pokeCache[id] = pkmn;
        displayPopup(pkmn);
    }
    else{
        displayPopup(pokeCache[id]);
    };
};

const displayPopup = (pkmn) => {
    const image = pkmn.sprites['front_default'];
    const htmlString = `
    <div class="popup">
        <button id="closeBtn" onclick="closePopup()">Close</button>
        <div class="card">
            <img class="card-image" src="${image}"/>
            <h2 class="card-title">${pkmn.id}. ${pkmn.name}</h2>
            <p><small>Height: </small>${pkmn.height}
            <p><small>Weight: </small>${pkmn.weight}
        </div>
    </div>`;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

//funcionalidade para fechar o popup
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}
getPokemon();

