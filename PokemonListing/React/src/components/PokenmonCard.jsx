import React from "react";

export default function PokenmonCard({pokemondetails}) {
  const { abilities, name, id, height } = pokemondetails;
  return (
    <div id={id} className="pokemon-card">
      <h4>{name}</h4>
      <h6>height: {height}</h6>
      <div className="abilities-container">
        {abilities.map((ability) => (
          <div key={ability.ability.name}>{ability.ability.name}</div>
        ))}
      </div>
    </div>
  );
}
