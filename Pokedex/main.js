class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(endpoint) {
    return fetch(this.baseURL + endpoint).then((response) => response.json());
  }
}

const API = new FetchWrapper('https://pokeapi.co/api/v2/pokemon/');
//'https://pokeapi.co/api/v2/pokemon?limit=100&&offset=200

let pokemons = [
  'pikachu',
  'ditto',
  'charmander',
  'eevee',
  'mewtwo',
  'squirtle',
  'bulbasaur',
  'snorlax',
  'dragonite',
];
let imgLink;

const fetchPokemons = (pokemons) => {
  pokemons.forEach((pokemon) => {
    API.get(pokemon).then((data) => {
      //Create card element, card image and card title
      const divCard = document.createElement('div');
      //Assign classes
      divCard.className = 'card';
      const divImg = document.createElement('div');
      divImg.className = 'card-img';
      const divTitle = document.createElement('div');
      divTitle.className = 'card-title';
      //Get container for cards
      const cardsContainer = document.querySelector('.cards');
      //Get link to a pokemon image
      imgLink = data.sprites.other['official-artwork'].front_default;
      // imgLink = data.sprites.other['dream_world']['front_default'];

      //Add new card elements and assign it appropriate link and name
      divCard.appendChild(divImg);
      divImg.style.backgroundImage = `url('${imgLink}')`;
      divCard.appendChild(divTitle);
      let pokemonType = data.types[0].type.name;
      divTitle.textContent = `${pokemon} (${pokemonType})`;
      cardsContainer.appendChild(divCard);
    });
  });
};

// Alternative solution
const API2 = new FetchWrapper('https://pokeapi.co/api/v2/pokemon');
API.get('?limit=20&&offset=200').then((data) => {
  const fetches = data.results.map((element) => {
    return fetch(element.url).then((res) => res.json());
  });
  Promise.all(fetches).then((results) =>
    console.log('Promise all results', results)
  );
});

//Search
const search = document.querySelector('#search');

const findPokemon = () => {
  console.log('Button search is clicked ' + search.value);
  pokemons = [search.value];
  fetchPokemons(pokemons);
};
search.addEventListener('change', findPokemon);
