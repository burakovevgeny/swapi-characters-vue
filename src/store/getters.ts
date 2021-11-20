import type { GetterTree } from 'vuex';
import type { State } from './state';

const getters: GetterTree<State, State> = {
  getCharacters: (state) => state.characters.data,
  getFavorites: (state) => state.favorites.favoriteData,
};

export default getters;