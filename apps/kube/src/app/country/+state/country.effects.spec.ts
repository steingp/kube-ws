import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CountryActions from './country.actions';
import { CountryEffects } from './country.effects';

describe('CountryEffects', () => {
  let actions: Observable<Action>;
  let effects: CountryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CountryEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CountryEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CountryActions.init() });

      const expected = hot('-a-|', {
        a: CountryActions.loadCountrySuccess({ country: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
