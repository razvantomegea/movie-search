import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Movie, MovieFilter } from './movie.model';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public isLoggedIn = false;
  public movies: Array<Movie> = [];

  constructor(private moviesService: MoviesService) {
  }

  public getImgPath(src: string): string {
    return `https://image.tmdb.org/t/p/w500/${src}`;
  }

  public ngOnInit(): void {
    this.isLoggedIn = !!sessionStorage.getItem('session');
    this.onFilter('popular');
  }

  public async onAddToFavorites(movie: Movie): Promise<void> {
    movie.favorite = !movie.favorite;
    await this.moviesService.addToFavorites(movie.id, movie.favorite);
  }

  public onFilter(filter: MovieFilter): void {
    if (filter === 'favorites') {
      this.moviesService.getFavoritesMovies().subscribe((movies) => {
        if (movies) {
          this.movies = movies;
        }
      });
    } else {
      this.moviesService.getPopularMovies().subscribe((movies) => {
        if (movies) {
          this.movies = movies;
        }
      });
    }
  }

  public async onLogin(): Promise<void> {
    try {
      const session: string = await this.moviesService.login();
      this.isLoggedIn = true;
      sessionStorage.setItem('session', session);
      const account = await this.moviesService.getAccount();
      sessionStorage.setItem('account', `${account}`);
    } catch (error) {
      if (error.error.status_message) {
        alert(error.error.status_message);
      } else {
        alert(error);
      }
    }
  }

  public onSearch(query: string): void {
    this.moviesService.searchMovies(query).subscribe((movies) => {
      if (movies) {
        this.movies = movies;
      }
    });
  }
}
