class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(endpoint) {
    return fetch(this.baseURL + endpoint)
      .then((response) => response.json())
      .catch((err) => alert('Not found'));
  }
}

const API = new FetchWrapper('https://pokeapi.co/api/v2/pokemon/');
//'https://pokeapi.co/api/v2/pokemon?limit=100&&offset=200

let pokemons, imgLink, divCard, divImg, divTitle, cardsContainer;

const createCard = () => {
  //Create card element, card image and card title
  divCard = document.createElement('div');
  //Assign classes
  divCard.className = 'card';
  divImg = document.createElement('div');
  divImg.className = 'card-img';
  divTitle = document.createElement('div');
  divTitle.className = 'card-title';
  //Get container for cards
  cardsContainer = document.querySelector('.cards');
};

const fetchPokemons = (pokemons) => {
  pokemons.forEach((pokemon) => {
    API.get(pokemon)
      .then((data) => {
        createCard();
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
      })
      .catch((err) => console.log(err));
  });
};

// Alternative solution
// const API2 = new FetchWrapper('https://pokeapi.co/api/v2/pokemon');
// API2.get('?limit=20&&offset=200').then((data) => {
//   const fetches = data.results.map((element) => {
//     return fetch(element.url).then((res) => res.json());
//   });
//   Promise.all(fetches).then((results) =>
//     console.log('Promise all results', results)
//   );
// });

//Search
const search = document.querySelector('#search');

const findPokemon = () => {
  console.log('Button search is clicked ' + search.value);
  pokemons = [search.value.toLowerCase()];

  fetchPokemons(pokemons);

  search.value = '';
};
search.addEventListener('change', findPokemon);

// Filter
const filter = document.querySelector('#filter');

filter.addEventListener('change', () => {
  const type = filter.value;
  console.log(type);
});
