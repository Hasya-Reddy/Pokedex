const searchBar = document.getElementById("searchBar");
const pokedex = document.getElementById("pokedex");
const container = document.getElementById("container");
const charactersList = document.getElementById("charactersList");
const pokemonContainer = document.querySelector(".pokemon-container");
let dataArray = [];
let pokemon;

// console.log("searchBar", searchBar);

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  // console.log("searchString1", searchString);

  const filteredCharacters = pokemon.filter((pokeman) => {
    return pokeman.name.toLowerCase().includes(searchString);
  });
  displayPokemon(filteredCharacters);
  // console.log("filteredCharacters", filteredCharacters);
});

const loadCharacters = async () => {
  for (let i = 1; i <= 150; i++) {
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${i}`, function (data) {
      {
        dataArray.push(data);
        // console.log("data", data);

        pokemon = dataArray.map((result) => ({
          name: result.name,
          image: result.sprites["front_default"],
          flipIamge: result.sprites["back_default"],
          type: result.types.map((type) => type.type.name).join(", "),
          id: result.id,
        }));
        //   console.log("pokemon", pokemon);
      }
    });
  }
};
loadCharacters();

const loadFlipImage = (img, flipIamge) => (img.src = flipIamge);

const revertFlipImage = (img, frontIamge) => (img.src = frontIamge);
var saveData = [];
const save = (pokeman) => {
  saveData.push(pokeman);
  console.log(pokeman);
  appendContainer();
};
const appendContainer = () => {
  const pokemonHTMLString = saveData.map(
    (pokeman) => `
      
            <img class="card-image" src="${pokeman}"  />
      
        `
  );
  container.innerHTML = pokemonHTMLString;
};

const displayPokemon = (pokemon1) => {
  const pokemonHTMLString = pokemon1.map(
    (pokeman) => '<li class="card"><center><img class="card-image" onmouseout="revertFlipImage(this,\''+pokeman.image+'\')"'+
            'onmouseover="loadFlipImage(this,\''+pokeman.flipIamge+'\')" src="'+pokeman.image+'" width="400" height="500" />'+
            '<h2 class="card-title">'+pokeman.name+'</h2><p class="card-subtitle">'+
            'Type: '+pokeman.type+'</p></center><button value="save" onclick="save(\''+pokeman.image+'\')" >save</button></li>'

  );
                          pokedex.innerHTML = pokemonHTMLString;
};
