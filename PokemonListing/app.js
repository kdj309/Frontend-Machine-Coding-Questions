const pokemonContainerRef = document.querySelector(".pokemon-container");
const pokemonDropdown = document.querySelector("#pokemon-dropdown");

const cache = {};
async function getCharacters() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    if (!response.ok) {
      throw new Error(response.statusText, { cause: response.status });
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
}
function createPokemonCard({ name, url }) {
  const pokemonOption = document.createElement("option");
  pokemonOption.value = url;
  pokemonOption.innerText = name;
  return pokemonOption;
}
async function getPokemonDetails(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText, { cause: response.status });
    }
    const data = await response.json();
    const pokemondetails = {
      abilities: data.abilities,
      name: data.name,
      id: data.id,
      height: data.height,
    };
    cache[url] = pokemondetails;
    return pokemondetails;
  } catch (error) {
    throw new Error(error.message);
  }
}
function addPokenMonDetailsToDom(pokemondetails) {
  pokemonContainerRef.replaceChildren(getPokemonDetailsCard(pokemondetails));
}
function getPokemonDetailsCard(pokemondetails) {
  const { abilities, name, id, height } = pokemondetails;
  const pokemonDetailsDiv = document.createElement("div");
  pokemonDetailsDiv.classList.add("pokemon-card");
  pokemonDetailsDiv.id = id;
  const abilitiesContainer = abilities.reduce((accum, ability) => {
    accum += `<div>${ability.ability.name}</div>`;
    return accum;
  }, ``);
  pokemonDetailsDiv.innerHTML = `
    <h4>${name}</h4>
    <h6>height: ${height}</h6>
    <div class="abilities-container">${abilitiesContainer}</div>
    `;
  return pokemonDetailsDiv;
}
(async () => {
  const pokemonContainerFragment = document.createDocumentFragment();
  const characters = await getCharacters();
  characters.forEach((pokemon) => {
    pokemonContainerFragment.appendChild(createPokemonCard(pokemon));
  });
  pokemonDropdown.appendChild(pokemonContainerFragment);
})();
pokemonDropdown.addEventListener("change", async (e) => {
  if (!cache[e.target.value]) {
    const details = await getPokemonDetails(e.target.value);
    addPokenMonDetailsToDom(details);
  } else {
    const details = cache[e.target.value];
    addPokenMonDetailsToDom(details);
  }
});
