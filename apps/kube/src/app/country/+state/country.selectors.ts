import { createFeatureSelector, createSelector } from '@ngrx/store';
import { COUNTRY_FEATURE_KEY, State, countryAdapter } from './country.reducer';

// Lookup the 'Country' feature state managed by NgRx
export const getCountryState =
  createFeatureSelector<State>(COUNTRY_FEATURE_KEY);

const { selectAll, selectEntities } = countryAdapter.getSelectors();

export const getCountryLoaded = createSelector(
  getCountryState,
  (state: State) => state.loaded
);

export const getCountryError = createSelector(
  getCountryState,
  (state: State) => state.error
);

export const getAllCountry = createSelector(getCountryState, (state: State) =>
  selectAll(state)
);

export const getCountryEntities = createSelector(
  getCountryState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCountryState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCountryEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
