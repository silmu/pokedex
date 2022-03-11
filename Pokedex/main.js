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

let pokemons, imgLink, divCard, divImg, divTitle, pType, cardsContainer;

const createCard = () => {
  //Create card element, card image and card title
  divCard = document.createElement('div');
  //Assign classes
  divCard.className = 'card';
  divImg = document.createElement('div');
  divImg.className = 'card-img';
  divTitle = document.createElement('div');
  divTitle.className = 'card-title';
  pType = document.createElement('p');
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
        let pokemonTypes = data.types;
        let pokemonType = '';
        pokemonTypes.forEach((type) => {
          // console.log(type.type.name);
          pokemonType += type.type.name + ' ';
        });
        // console.log(pokemonTypes);
        // pokemonType = data.types[0].type.name;
        pType.className = pokemonType.trim();
        pType.textContent = pokemonType.trim();
        divTitle.textContent = pokemon;
        divTitle.appendChild(pType);
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
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const cardClass = card.lastChild.childNodes[1].className;
    console.log('Current class names: ' + cardClass);
    //If filter is set to none display everything
    if (type === 'none') {
      card.style.display = 'inline-block';
    }
    //If the current card doesn't include searched type hide it
    else if (!cardClass.includes(type)) {
      console.log('Type to filter: ' + type);
      card.style.display = 'none';
    } else {
      card.style.display = 'inline-block';
    }
    console.log(card.lastChild.childNodes[1].className);
  });
  // console.log(type);
});
