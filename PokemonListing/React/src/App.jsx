import { useState, useEffect } from "react";
import "./App.css";
import PokenmonCard from "./components/PokenmonCard";
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
function App() {
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [options, setOptions] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const optionsresponse = await getCharacters();
        setOptions(
          optionsresponse.map((pokemon) => ({
            label: pokemon.name,
            value: pokemon.url,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    })()
  }, []);

  useEffect(() => {
    if (!cache[selectedPokemon] && selectedPokemon !== null) {
      (async () => {
        try {
          const pokemondata = await getPokemonDetails(selectedPokemon);
          setPokemonDetails(pokemondata);
        } catch (error) {
          console.log(error);
        }
      })()
    }else{
      setPokemonDetails(cache[selectedPokemon])
    }
  }, [selectedPokemon]);

  return (
    <>
      <h2>Pokemon Listing</h2>
      <section>
        <select
          id="pokemon-dropdown"
          value={selectedPokemon}
          onChange={(e) => setSelectedPokemon(e.target.value)}
        >
          {options.map((op) => (
            <option key={op.label} value={op.value}>{op.label}</option>
          ))}
        </select>
      </section>
      {(selectedPokemon && pokemonDetails!==null)&&(
        <section>
          <PokenmonCard pokemondetails={pokemonDetails}></PokenmonCard>
        </section>
      )}
    </>
  );
}

export default App;
