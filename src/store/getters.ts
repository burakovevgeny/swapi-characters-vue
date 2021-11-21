import type { GetterTree } from 'vuex';
import type { State } from './state';

const getters: GetterTree<State, State> = {
  getCharacters: (state) => state.characters.data,
  getStatus: (state) => state.characters.status,
  getFavorites: (state) => state.favorites.favoriteData,
};

export default getters;