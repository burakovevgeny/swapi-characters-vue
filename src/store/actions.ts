import type { ActionTree, Commit } from 'vuex';
import type { State } from './state';
import { api } from '@/api/config';
import { getIdAndQuery } from '@/helpers';
import { PeopleResponse, Homeworld, People } from '@/models';

const actions: ActionTree<State, State> = {
  async getPeople(): Promise<People[]> {
    const { results, count } = await api.get<any, PeopleResponse>('people');
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
        return api.get<any, Homeworld>(`${query}/${id}`);
      }),
    );
    return peopleResult.map((character, index) => ({ ...character, homeworld: homeworlds[index] }));
  },

  async getPeopleAction({ commit }: { commit: Commit }) {
    commit('SET_TEST_VALUE');
  },
};

export default actions;
