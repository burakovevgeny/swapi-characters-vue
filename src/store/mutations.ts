import type { MutationTree } from 'vuex';

import { State } from './state';
import { APIStatus, People } from '@/models';

const mutations: MutationTree<State> = {
  SET_DATA: (state, data: People[]) => {
    state.characters.status = APIStatus.Success;
    state.characters.data = data;
  },
  SET_LOADING: (state) => (state.characters.status = APIStatus.Loading),
  SET_ERROR: (state) => (state.characters.status = APIStatus.Error),
  ADD_FAVORITE: (state, id: string) => {
    const candidate = state.characters.data.find((character) => character.id === id);
    state.favorites.favoriteData.push(candidate as People);
  },
  REMOVE_FAVORITE: (state, id: string) => {
    state.favorites.favoriteData = state.favorites.favoriteData.filter((character) => character.id !== id);
  },

  SET_FAVORITE_LOCAL_STORE: (state) => {
    const preloadedState = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites") as string)
    : [];
    state.favorites.favoriteData = preloadedState;
  },
};

export default mutations;
