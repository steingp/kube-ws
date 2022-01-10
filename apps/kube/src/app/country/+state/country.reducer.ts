import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CountryActions from './country.actions';
import { CountryEntity } from './country.models';

export const COUNTRY_FEATURE_KEY = 'country';

export interface State extends EntityState<CountryEntity> {
  selectedId?: string | number; // which Country record has been selected
  loaded: boolean; // has the Country list been loaded
  error?: string | null; // last known error (if any)
}

export interface CountryPartialState {
  readonly [COUNTRY_FEATURE_KEY]: State;
}

export const countryAdapter: EntityAdapter<CountryEntity> =
  createEntityAdapter<CountryEntity>();

export const initialState: State = countryAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const countryReducer = createReducer(
  initialState,
  on(CountryActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CountryActions.loadCountrySuccess, (state, { country }) =>
    countryAdapter.setAll(country, { ...state, loaded: true })
  ),
  on(CountryActions.loadCountryFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return countryReducer(state, action);
}
