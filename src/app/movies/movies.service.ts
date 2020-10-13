import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/internal/operators';
import { Movie } from './movie.model';

const API_KEY = '12b270960b5148f0e174a8ad769617db';
const MOVIE_API_URL = 'https://api.themoviedb.org/3/';

interface MovieSearchResponse {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private httpClient: HttpClient) { }

  public addToFavorites(id: number, favorite: boolean): Promise<boolean> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        api_key: API_KEY,
        session_id: sessionStorage.getItem('session')
      }
    });

    const body = {
      media_type: 'movie',
      favorite,
      media_id: id
    };

    const account: string = sessionStorage.getItem('account') || '';

    return this.httpClient.post(
      `${MOVIE_API_URL}account/${account}/favorite`, body, { observe: 'response', params }
    )
      .pipe(map((response: HttpResponse<MovieSearchResponse>) => {
        if (response && response.status === 201) {
          return true;
        }
      }), take(1)).toPromise();
  }

  public authorizeToken(token: string): Promise<string> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        api_key: API_KEY
      }
    });

    const body = {
      username: 'razvantomegea',
      password: 'Tr19407#!',
      request_token: token
    }

    return this.httpClient.post(`${MOVIE_API_URL}authentication/token/validate_with_login`,
      body,
      { observe: 'response', params }
    )
      .pipe(map((response: HttpResponse<{ success: boolean; request_token: string }>) => {
        if (response && response.status === 200 && response.body.success) {
          return response.body.request_token;
        }
      }),
        take(1)
      ).toPromise();
  }

  public async getAccount(): Promise<number> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        api_key: API_KEY,
        session_id: sessionStorage.getItem('session')
      }
    });

    return this.httpClient.get(`${MOVIE_API_URL}account`,
      { observe: 'response', params }
    )
      .pipe(map((response: HttpResponse<{ id: number }>) => {
        if (response && response.status === 200) {
          return response.body.id;
        }
      }),
        take(1)
      ).toPromise();
  }

  public getFavoritesMovies(): Observable<Array<Movie>> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        api_key: API_KEY,
        session_id: sessionStorage.getItem('session')
      }
    });

    const account: string = sessionStorage.getItem('account') || '';

    return this.httpClient.get(
      `${MOVIE_API_URL}account/${account}/favorite/movies`, { observe: 'response', params }
    )
      .pipe(map((response: HttpResponse<MovieSearchResponse>) => {
        if (response && response.status === 200) {
          return response.body.results;
        }
      })
      );
  }

  public getMovieDetails(id: number): Promise<Movie> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        api_key: API_KEY
      }
    });

    return this.httpClient.get(`${MOVIE_API_URL}movie/${id}`, { observe: 'response', params })
      .pipe(map((response: HttpResponse<Movie>) => {
        if (response && response.status === 200) {
          return response.body;
        }
      }), take(1)
      ).toPromise();
  }

  public getPopularMovies(): Observable<Array<Movie>> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        api_key: API_KEY,
        language: 'en-US',
        page: `${1}`,
        include_adult: `${false}`
      }
    });

    return this.httpClient.get(`${MOVIE_API_URL}movie/popular`, { observe: 'response', params })
      .pipe(map((response: HttpResponse<MovieSearchResponse>) => {
        if (response && response.status === 200) {
          return response.body.results;
        }
      })
      );
  }

  public async getToken(): Promise<string> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        api_key: API_KEY
      }
    });

    return this.httpClient.get(`${MOVIE_API_URL}authentication/token/new`,
      { observe: 'response', params }
    )
      .pipe(map((response: HttpResponse<{ success: boolean; request_token: string }>) => {
        if (response && response.status === 200 && response.body.success) {
          return response.body.request_token;
        }
      }),
        take(1)
      ).toPromise();
  }

  public async login(): Promise<string> {
    const token: string = await this.authorizeToken(await this.getToken());
    const params: HttpParams = new HttpParams({
      fromObject: {
        api_key: API_KEY
      }
    });
    const body = {
      request_token: token
    };

    return this.httpClient.post(
      `${MOVIE_API_URL}authentication/session/new`,
      body,
      { observe: 'response', params }
    )
      .pipe(map((response: HttpResponse<{ success: boolean; session_id: string }>) => {
        if (response && response.status === 200 && response.body.success) {
          return response.body.session_id;
        }
      }),
        take(1)
      ).toPromise();
  }

  public searchMovies(query: string): Observable<Array<Movie>> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        query,
        api_key: API_KEY,
        language: 'en-US',
        page: `${1}`,
        include_adult: `${false}`
      }
    });

    return this.httpClient.get(`${MOVIE_API_URL}search/movie`, { observe: 'response', params })
      .pipe(map((response: HttpResponse<MovieSearchResponse>) => {
        if (response && response.status === 200) {
          return response.body.results;
        }
      })
      );
  }
}
