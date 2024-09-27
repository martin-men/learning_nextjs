'use client'

import { useAppSelector } from "@/store";
import { PokemonGrid } from "@/pokemons";

export const FavoritePokemons = () => {
  const pokemons = useAppSelector(state => state.pokemons)
  const pokemonsArray = Object.values(pokemons)

  return (
    <PokemonGrid pokemons={pokemonsArray} />
  )
}
