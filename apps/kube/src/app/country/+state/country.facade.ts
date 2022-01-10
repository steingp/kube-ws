import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as CountryActions from './country.actions';
import * as CountryFeature from './country.reducer';
import * as CountrySelectors from './country.selectors';

@Injectable()
export class CountryFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CountrySelectors.getCountryLoaded));
  allCountry$ = this.store.pipe(select(CountrySelectors.getAllCountry));
  selectedCountry$ = this.store.pipe(select(CountrySelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CountryActions.init());
  }
}
