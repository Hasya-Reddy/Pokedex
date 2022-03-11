const searchBar = document.getElementById("searchBar");
const pokedex = document.getElementById("pokedex");
const container = document.getElementById("container");
let dataArray = [];
let pokemon;

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredCharacters = pokemon.filter((pokeman) => {
    return pokeman.name.toLowerCase().includes(searchString);
  });

  displayPokemon(filteredCharacters);
});

const loadCharacters = async () => {
  for (let i = 1; i <= 150; i++) {
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${i}`, function (data) {
      {
        dataArray.push(data);
        pokemon = dataArray.map((result) => ({
          name: result.name,
          image: result.sprites["front_default"],
          flipIamge: result.sprites["back_default"],
          type: result.types.map((type) => type.type.name).join(", "),
          id: result.id,
        }));
      }
    });
  }
};

loadCharacters();

const loadFlipImage = (img, flipIamge, id) => {
  img.src = flipIamge;
  document.getElementById(id).style = "display:block";
};

const revertFlipImage = (img, frontIamge, id) => {
  img.src = frontIamge;
  document.getElementById(id).style = "display:none";
};

var saveData = [];
const save = (pokeman) => {
  const isExists = saveData.findIndex((i) => i.id === pokeman.id);
  if (isExists >= 0) {
    alert("Image" + " " + pokeman.name + " " + "already exists");
    return false;
  }
  saveData.push(pokeman);
  reloadImage();
};

const retriveData = (id) => {
  let data = saveData.find((i) => i.id == id);
  displayPokemon([data]);
};
const reloadImage = () => {
  $("#imageContainer").show();
  container.innerHTML = saveData.map(
    (data) =>
      `<img class="card-image" onclick="retriveData('${data.id}')" src="${data.image}"  />`
  );
};

const displayPokemon = (pokemonData) => {
  const pokemonHTMLString = pokemonData.map(
    (pokeman) =>
      `<li ><center><img  onmouseout=revertFlipImage(this,"${pokeman.image}","${
        pokeman.id
      }")
      onmouseover=loadFlipImage(this,"${pokeman.flipIamge}","${
        pokeman.id
      }") src="${pokeman.image}" width="200" height="200"/>
      <h2 class="card-title">${pokeman.name}</h2>
      <div style="display:none" id=${
        pokeman.id
      }><p class="card-subtitle">Type:${pokeman.type}</p> </div>
      </center>
      <div width="100%" style="text-align:center">
      <button value="save" onclick='save(${JSON.stringify(
        pokeman
      )})' >save</button>
      </div>
      </li>`
  );
  pokedex.innerHTML = pokemonHTMLString;
};
