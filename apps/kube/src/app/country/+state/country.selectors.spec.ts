import { CountryEntity } from './country.models';
import {
  countryAdapter,
  CountryPartialState,
  initialState,
} from './country.reducer';
import * as CountrySelectors from './country.selectors';

describe('Country Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCountryId = (it: CountryEntity) => it.id;
  const createCountryEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CountryEntity);

  let state: CountryPartialState;

  beforeEach(() => {
    state = {
      country: countryAdapter.setAll(
        [
          createCountryEntity('PRODUCT-AAA'),
          createCountryEntity('PRODUCT-BBB'),
          createCountryEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Country Selectors', () => {
    it('getAllCountry() should return the list of Country', () => {
      const results = CountrySelectors.getAllCountry(state);
      const selId = getCountryId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CountrySelectors.getSelected(state) as CountryEntity;
      const selId = getCountryId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getCountryLoaded() should return the current "loaded" status', () => {
      const result = CountrySelectors.getCountryLoaded(state);

      expect(result).toBe(true);
    });

    it('getCountryError() should return the current "error" state', () => {
      const result = CountrySelectors.getCountryError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
