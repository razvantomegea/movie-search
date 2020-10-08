import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, exhaustMap, switchMap, tap } from 'rxjs/internal/operators';
import { MoviesService } from 'src/app/movies/movies.service';
import { Movie } from '../../movie.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() private filter: EventEmitter<string> = new EventEmitter();
  @Output() private login: EventEmitter<void> = new EventEmitter();
  @Output() private logout: EventEmitter<void> = new EventEmitter();
  @Output() private search: EventEmitter<string> = new EventEmitter();

  public isMenuCollapsed: boolean;

  constructor() { }

  public onFilterMovies(filter: string): void {
    this.filter.emit(filter);
    this.onMenuCollapse(true);
  }

  public async onSearchMovies(event: any): Promise<void> {
    await new Promise(r => {
      setTimeout(() => {
        this.search.emit(event.target.value);
      }, 500);
    });
  }


  public onMenuCollapse(isMenuCollapsed: boolean): void {
    this.isMenuCollapsed = isMenuCollapsed;
  }

}
