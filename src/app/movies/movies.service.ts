import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Movie } from './movie.model';

const API_KEY = '12b270960b5148f0e174a8ad769617db';
const MOVIE_API_URL = 'https://api.themoviedb.org/3/';

interface MovieSearchResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: Array<Movie>;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

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

    return this.httpClient.get(MOVIE_API_URL, { observe: 'response', params })
      .pipe(map((response: HttpResponse<MovieSearchResponse>) => {
        if (response && response.status === 200) {
          return response.body.results;
        }
      })
      );
  }
}
