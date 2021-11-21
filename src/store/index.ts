import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import state from './state';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

store.subscribe((mutation, state) => {
  localStorage.setItem('favorites', JSON.stringify(state.favorites.favoriteData));
});

export default store;
