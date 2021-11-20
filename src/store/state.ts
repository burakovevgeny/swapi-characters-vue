import { People, APIStatus } from '../models';

export interface State {
  characters: {
    data: People[];
    status: APIStatus;
  };
  favorites: {
    favoriteData: People[];
  };
}

export const state = (): State => ({
  characters: {
    data: [],
    status: APIStatus.Init,
  },
  favorites: {
    favoriteData: [],
  },
});

export default state;
