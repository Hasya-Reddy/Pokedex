const searchBar = document.getElementById('searchBar');
const pokedex = document.getElementById('pokedex');
const charactersList = document.getElementById('charactersList');
let dataArray = [];
let pokemon;


searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = pokemon.filter((pokeman) => {
        return (
            pokeman.name.toLowerCase().includes(searchString)
        );
    });
    displayPokemon(filteredCharacters);
    
    
});

const loadCharacters = async () => {
  for (let i = 1; i <= 150; i++) {
    $.getJSON( `https://pokeapi.co/api/v2/pokemon/${i}`, function( data ) {
       {
        dataArray.push(data);
        
        pokemon = dataArray.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
      };
    })};
}
loadCharacters();

const displayPokemon = (pokemon1) => {
    const pokemonHTMLString = pokemon1
        .map(
            (pokeman) => `
        <li class="card">
            <center>
            <img class="card-image" src="${pokeman.image}" width="400" 
            height="500"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
            </center>
        </li>
    `
        )
        
    pokedex.innerHTML = pokemonHTMLString;
    
};


