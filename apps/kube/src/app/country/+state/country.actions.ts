import { createAction, props } from '@ngrx/store';
import { CountryEntity } from './country.models';

export const init = createAction('[Country Page] Init');

export const loadCountrySuccess = createAction(
  '[Country/API] Load Country Success',
  props<{ country: CountryEntity[] }>()
);

export const loadCountryFailure = createAction(
  '[Country/API] Load Country Failure',
  props<{ error: any }>()
);
