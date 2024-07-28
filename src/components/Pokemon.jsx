import { useState } from "react";
import { useEffect } from "react";
import PokemonCard from "./PokemonCard";

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);

      const detailsPokemon = data.results.map(async (currPokemon) => {
        // console.log(currPokemon.url);
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        // console.log(data);
        return data;
      });
      const detailedResponse = await Promise.all(detailsPokemon);
      // console.log(detailedResponse);
      setPokemonData(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // search functionality
  const searchPokemonData = pokemonData.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div>
        <h1 className="error">{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <div className="header_content">
          <h1>Let's Catch Pokémon</h1>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Pokémon"
          />
        </div>
        {loading ? (
          <div>
            <h1 className="loading">Loading...</h1>
          </div>
        ) : (
          <div className="card_container">
            {searchPokemonData.length > 0 ? (
              searchPokemonData.map((currPokemon) => (
                <PokemonCard key={currPokemon.id} pokemonData={currPokemon} />
              ))
            ) : (
              <div className="no_result">
                <h2>Pokemon Card Not Found</h2>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Pokemon;
