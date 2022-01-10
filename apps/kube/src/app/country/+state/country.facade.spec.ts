import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as CountryActions from './country.actions';
import { CountryEffects } from './country.effects';
import { CountryFacade } from './country.facade';
import { CountryEntity } from './country.models';
import {
  COUNTRY_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './country.reducer';
import * as CountrySelectors from './country.selectors';

interface TestSchema {
  country: State;
}

describe('CountryFacade', () => {
  let facade: CountryFacade;
  let store: Store<TestSchema>;
  const createCountryEntity = (id: string, name = ''): CountryEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(COUNTRY_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CountryEffects]),
        ],
        providers: [CountryFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CountryFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allCountry$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allCountry$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadCountrySuccess` to manually update list
     */
    it('allCountry$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allCountry$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        CountryActions.loadCountrySuccess({
          country: [createCountryEntity('AAA'), createCountryEntity('BBB')],
        })
      );

      list = await readFirst(facade.allCountry$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
