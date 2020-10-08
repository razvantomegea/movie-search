import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgbModule, NgbCollapseModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDsrj1sOneuAV3oekcqScD2_Cn8z3J9Bt8',
  authDomain: 'movie-search-46cb5.firebaseapp.com',
  databaseURL: 'https://movie-search-46cb5.firebaseio.com',
  projectId: 'movie-search-46cb5',
  storageBucket: 'movie-search-46cb5.appspot.com',
  messagingSenderId: '44660265964',
  appId: '1:44660265964:web:ce9a7815cecf5d6c58e6c9',
  measurementId: 'G-78BHRRQD51'
};


@NgModule({
  declarations: [MoviesComponent, ToolbarComponent],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    CommonModule,
    MoviesRoutingModule,
    NgbModule,
    NgbCollapseModule,
    NgbTypeaheadModule
  ]
})
export class MoviesModule { }
