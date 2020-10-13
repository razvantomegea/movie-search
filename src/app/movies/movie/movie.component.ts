import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movie: Movie;

  constructor(private activatedRoute: ActivatedRoute, private movieService: MoviesService) { }

  public async ngOnInit(): Promise<void> {
    this.movie = await this.movieService.getMovieDetails(this.activatedRoute.snapshot.params.id);
  }

  public get genres(): string {
    return this.movie ? this.movie.genres.map(g => g.name).join(', ') : 'N\A';
  }

}
