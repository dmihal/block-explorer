import FuelAPI from '@fuel-js/api';
import { getNetwork } from './environment';

let api: FuelAPI | null = null;

const getAPI = (): FuelAPI => {
  if (!api) {
    api = new FuelAPI(getNetwork());
  }
  return api;
};

export default getAPI;
