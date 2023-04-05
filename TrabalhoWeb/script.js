const url = "https://pokeapi.co/api/v2/pokemon?limit=251&offset=0";


fetch(url)
  .then(response => response.json())
  .then(data => {
    const pokeList = document.getElementById("listPokemon");

    // Pega o numero da Pokedex da URL do pokemon
    const getPokemonNumber = url => {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 2]);
    };

    // Define a ordem dos pokemons
    const sortedData = data.results.sort((a, b) => {
      return getPokemonNumber(a.url) - getPokemonNumber(b.url);
    });

    // Cria um promisse para cada Pokémon
    const pokemonPromises = sortedData.map(pokemon => {
      const pokemonUrl = pokemon.url;
      return fetch(pokemonUrl).then(response => response.json());
    });

    // Pega as promessas e aguarda serem concluidas.
    Promise.all(pokemonPromises).then(pokemonDataArray => {

      // Cria um container para cada Pokémon
      pokemonDataArray.forEach(pokemonData => {
        const container = document.createElement("div");
        container.classList.add("containerPokemon");

        // Adiciona uma classe no container com base no tipo do Pokémon
        const pokemonType = pokemonData.types[0].type.name;
        container.classList.add(`type-${pokemonType}`);

        // Cria um elemento de imagem para o Pokémon
        const img = document.createElement("img");
        img.src = pokemonData.sprites.front_default;
        container.appendChild(img);

        // Cria um elemento de texto para o número do Pokémon
        const number = document.createElement("div");
        number.classList.add("numeroPokemon");
        number.innerText = `#${pokemonData.id.toString().padStart(3, "0")}`;
        container.appendChild(number);

        // Cria um elemento de texto para o nome do Pokémon
        const name = document.createElement("div");
        name.classList.add("nomePokemon");
        name.innerText = pokemonData.name;
        container.appendChild(name);

        // Cria um elemento de texto para o tipo do Pokémon
        const types = document.createElement("div");
        types.classList.add("info");
        types.innerText = `Type: ${pokemonData.types.map(type => type.type.name).join("/")}`;
        container.appendChild(types);

        // Adiciona o container do Pokémon à lista
        pokeList.appendChild(container);
      });
    });
  });

//Metodo para fazer o picachu se mexer na Page 1

var gif = document.getElementById("gif");
var position = -130;
var move = 1;
var interval = setInterval(frame, 10);

function frame() {
  if (position >= window.innerWidth) {
    clearInterval(interval);
    position = -130;
    interval = setInterval(frame, 10);
  } else {
    position += move;
    gif.style.left = position + 'px';
  }
}

//Funcao pra definir a musica com volume minimo

var meuAudio = document.getElementById("meuAudio");
meuAudio.volume = 0.1; // Configura o volume para 10%

//Pré-loader

window.addEventListener("load", function () {
  const loader = document.querySelector("#loader");
  loader.className += " hidden";
});