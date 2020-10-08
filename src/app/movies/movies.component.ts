import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private moviesService: MoviesService) {
  }

  ngOnInit(): void {
  }

  public onLogin(): void {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public onLogout(): void {
    this.afAuth.signOut();
  }

  public onSearch(query: string): void {
    console.log(query);
  }

  public onFilter(filter: string): void {

  }

}
