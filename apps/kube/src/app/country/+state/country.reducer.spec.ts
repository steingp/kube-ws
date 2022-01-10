import { Action } from '@ngrx/store';

import * as CountryActions from './country.actions';
import { CountryEntity } from './country.models';
import { State, initialState, reducer } from './country.reducer';

describe('Country Reducer', () => {
  const createCountryEntity = (id: string, name = ''): CountryEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Country actions', () => {
    it('loadCountrySuccess should return the list of known Country', () => {
      const country = [
        createCountryEntity('PRODUCT-AAA'),
        createCountryEntity('PRODUCT-zzz'),
      ];
      const action = CountryActions.loadCountrySuccess({ country });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
