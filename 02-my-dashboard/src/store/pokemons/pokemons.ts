import { SimplePokemon } from "@/pokemons";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonsState {
  favorites: { [key: string]: SimplePokemon };
}

// * We can not access localStorage directly here, because localStorage is not available in the server side
// const getInitialState = () => {
//   return JSON.parse(localStorage.getItem("favorite-pokemons") ?? "{}");
// };

const initialState: PokemonsState = {
  favorites: {},
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,

  /*
  REDUCERS must be pure functions, which means that:
  - They always return the same result given the same arguments.
  - They depend only on the arguments passed to them.
  - They do not produce side effects, such as API requests or I/O operations.
  - They do not directly modify the arguments passed to them, instead they return a new object.
  */
  reducers: {
    setFavoritePokemons(
      state,
      action: PayloadAction<{ [key: string]: SimplePokemon }>
    ) {
      /* Se agregó el campo favorites para evitar modificar directamente el state */
      state.favorites = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload;
      const { id } = pokemon;

      if (!!state.favorites[id]) {
        delete state.favorites[id];
      } else {
        state.favorites[id] = pokemon;
      }

      // ! THIS SHOULD NOT BE DONE IN A REDUCER
      // localStorage.setItem("favorite-pokemons", JSON.stringify(state));
    },
  },
});

export const { toggleFavorite, setFavoritePokemons } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
