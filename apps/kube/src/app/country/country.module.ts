import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCountry from './+state/country.reducer';
import { CountryEffects } from './+state/country.effects';
import { CountryFacade } from './+state/country.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CountryRoutingModule,
    StoreModule.forFeature(
      fromCountry.COUNTRY_FEATURE_KEY,
      fromCountry.reducer
    ),
    EffectsModule.forFeature([CountryEffects]),
  ],
  providers: [CountryFacade],
})
export class CountryModule {}
