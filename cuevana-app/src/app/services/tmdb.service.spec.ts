import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { TmdbService } from './tmdb.service';
import { environment } from '../../environments/environment';

describe('TmdbService', () => {
  let service: TmdbService;
  let httpMock:  HttpTestingController;

  const baseUrl = environment.TMDB_BASE_URL;
  const apiKey = environment.TMDB_API_KEY;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController],
      providers: [TmdbService]
    });
    service = TestBed.inject(TmdbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify()
  });

  describe('#getPopularMovies' , () => {
    it('Debe solicitar y devolver una lista de peliculas populares', () => {

      const dummyResponse = {
        page: 1,
        results: [{id: 1, title: 'A'}],
        total_results: 1
      };
  
      service.getPopularMovies().subscribe(res => {
          expect(res).toEqual(dummyResponse);
      });
  
      const req = httpMock.expectOne(`${baseUrl}/movie/popular?api_key=${apiKey}&language=es`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  

  it('getMovieDetails hace GET a movie/:id y devuelve una sola pelicula'), () => {
    const id = 950387;
    const detail = {id, title:'A Minecraft Movie'};

    service.getMovieDetails(id).subscribe(r => expect(r).toEqual(detail));

    const req = httpMock.expectOne(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=es`);
    req.flush(detail);
  };

});
