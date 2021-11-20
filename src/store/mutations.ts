import type { MutationTree } from 'vuex';

import { State } from './state';
import { APIStatus } from '@/models';

const mutations: MutationTree<State> = {
  SET_TEST_VALUE: (state) => (state.characters.status = APIStatus.Error),
};

export default mutations;
