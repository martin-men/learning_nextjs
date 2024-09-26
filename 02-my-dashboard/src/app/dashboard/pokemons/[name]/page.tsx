import { Pokemon, PokemonsResponse } from "@/pokemons";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface props {
  params: { name: string };
}

/*
Para generar páginas estáticas de forma anticipada, de tal forma que el servidor
no tenga que generar la página en tiempo real

Esto se usa para páginas que no cambian con frecuencia y se conocen de antemano

Esto se ejecuta en tiempo de construcción
!En build time
*/
export async function generateStaticParams() {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`
  ).then((response) => response.json());

  const pokemons = data.results.map((pokemon) => ({
    name: pokemon.name
  }));

  return pokemons
}

const getPokemon = async (name: string): Promise<Pokemon> => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    next: {
      revalidate: 60 * 60 * 24 * 30
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokemon no encontrado");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(() => {
      notFound();
    });
};

/* Para generar metadatos de forma dinámica */
export async function generateMetadata({ params }: props): Promise<Metadata> {
  try {
    const { id, name } = await getPokemon(params.name);
    return {
      title: `Pokemon ${name}`,
      description: `Información del pokemon ${id}`,
    };
  } catch {
    return {
      title: "Pokemon no encontrado",
      description: "El pokemon no se encuentra en la base de datos",
    };
  }
}

export default async function PokemonPage({ params }: props) {
  const pokemon = await getPokemon(params.name);

  return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ""}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />

            <div className="flex flex-wrap">
              {pokemon.moves.map((move) => (
                <p key={move.move.name} className="mr-2 capitalize">
                  {move.move.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {pokemon.types.map((type) => (
                <p key={type.slot} className="mr-2 capitalize">
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {pokemon.weight}
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
