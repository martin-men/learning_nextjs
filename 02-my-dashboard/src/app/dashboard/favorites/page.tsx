import { FavoritePokemons } from "@/pokemons";

export const metadata = {
 title: 'Favorite pokemons',
 description: 'Favorite pokemons',
};

export default function PokemonsPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Pokemons favoritos <small className="text-blue-500">Global state</small>
      </span>
      <FavoritePokemons />
    </div>
  );
}
