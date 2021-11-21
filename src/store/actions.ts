import type { ActionTree, Commit } from 'vuex';
import type { State } from './state';
import { api } from '@/api/config';
import { getIdAndQuery } from '@/helpers';
import { PeopleResponse, Homeworld, People } from '@/models';

const actions: ActionTree<State, State> = {
  async setPeople({ commit }: { commit: Commit }): Promise<People[] | undefined> {
    try {
      commit('SET_LOADING');
      const { results, count } = await api.get<null, PeopleResponse>('people');
      const people = results;
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);
      const promises: Array<PeopleResponse> = [];

      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(
          await api.get(`people`, {
            params: {
              page: i,
            },
          }),
        );
      }
      const resultPromisesPeople = await Promise.all(promises);
      const peopleResult = resultPromisesPeople.reduce((acc, data) => [...acc, ...data.results], people);

      const homeworlds = await Promise.all(
        peopleResult.map(({ homeworld }) => {
          const { id, query } = getIdAndQuery(homeworld as string);
          return api.get<{ query: string; id: string }, Homeworld>(`${query}/${id}`);
        }),
      );
      const response = peopleResult.map((character, index) => {
        const { id } = getIdAndQuery(character.url as string);
        return { ...character, homeworld: homeworlds[index], id };
      });

      commit('SET_DATA', response);

      return response;
    } catch (error) {
      commit('SET_ERROR');
      console.log(error, 'People request fail');
    }
  },

  addToFavorite({ commit }: { commit: Commit }, id: string) {
    commit('ADD_FAVORITE', id);
  },

  removeFromFavorite({ commit }: { commit: Commit }, id: string) {
    commit('REMOVE_FAVORITE', id);
  },

  addFavoriteToLocalStore({ commit }: { commit: Commit }) {
    commit('SET_FAVORITE_LOCAL_STORE');
  },
};

export default actions;
