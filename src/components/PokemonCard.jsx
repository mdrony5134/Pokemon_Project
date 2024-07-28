import React from "react";

const PokemonCard = ({ pokemonData }) => {
  console.log(pokemonData);

  return (
    <>
      <div className="pokemon_card">
        <figure>
          <img
            src={pokemonData.sprites.other.dream_world.front_default}
            alt={pokemonData.name}
            className="pokemon_image"
          />
        </figure>
        <h2 className="pokemon_name">{pokemonData.name}</h2>
        <div className="pokemon_highlight">
          <p>
            {pokemonData.types.map((currType) => currType.type.name).join(", ")}
          </p>
        </div>
        <div className="grid_three_col">
          <p>
            <span>Height:</span>
            {pokemonData.height}
          </p>
          <p>
            <span>Weight:</span>
            {pokemonData.weight}
          </p>
          <p>
            <span>Speed:</span>
            {pokemonData.stats[5].base_stat}
          </p>
        </div>
        <div className="grid_three_col">
          <p>
            <span>Experience:</span>
            {pokemonData.base_experience}
          </p>
          <p>
            <span>Attack:</span>
            {pokemonData.stats[1].base_stat}
          </p>
          <p>
            <span>Abilities:</span>
            {pokemonData.abilities.map(
              (currAbilities) => currAbilities.ability.name
            ).slice(0 , 1)}
          </p>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
