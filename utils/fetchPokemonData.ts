import { PokemonDataFull } from "../interfaces";
import { pokeApi } from "../pages/api";

export const fetchPokemonData = async (idOrName: number | string) => {

  const pokemonData: PokemonDataFull = await (
    await fetch(`${pokeApi.baseURL}/pokemon/${idOrName}`)
  ).json();

  return {
    name: pokemonData.name,
    id: pokemonData.id,
    sprites: pokemonData.sprites
  }
}