import { TestBed } from '@angular/core/testing';

import { MovieFacadeService } from './movie-facade.service';

describe('MovieFacadeService', () => {
  let service: MovieFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
