import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieFilter } from '../../movie.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() public isLoggedIn = false;
  @Output() private filter: EventEmitter<MovieFilter> = new EventEmitter();
  @Output() private login: EventEmitter<void> = new EventEmitter();
  @Output() private search: EventEmitter<string> = new EventEmitter();

  public isMenuCollapsed: boolean;

  constructor() { }

  public onFilterMovies(filter: MovieFilter): void {
    this.filter.emit(filter);
    this.onMenuCollapse(true);
  }

  public onLogin(): void {
    this.login.emit();
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
