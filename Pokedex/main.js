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

const pokemons = [
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
    imgLink = data.sprites.other['official-artwork']['front_default'];

    //Add new card elements and assign it appropriate link and name
    divCard.appendChild(divImg);
    divImg.style.backgroundImage = `url('${imgLink}')`;
    divCard.appendChild(divTitle);
    divTitle.textContent = pokemon;
    cardsContainer.appendChild(divCard);
  });
});
