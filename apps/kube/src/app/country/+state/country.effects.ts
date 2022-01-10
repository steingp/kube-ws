import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CountryActions from './country.actions';
import * as CountryFeature from './country.reducer';

@Injectable()
export class CountryEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CountryActions.loadCountrySuccess({ country: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return CountryActions.loadCountryFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
