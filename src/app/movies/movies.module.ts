import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbCollapseModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';

@NgModule({
  declarations: [MoviesComponent, ToolbarComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    NgbModule,
    NgbCollapseModule,
    NgbTypeaheadModule
  ]
})
export class MoviesModule { }
