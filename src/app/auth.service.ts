import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-users';
import { from, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // $ symbol indicates its Observable
  user$: Observable<firebase.User | null>;

  constructor(
    private userService: UserService, 
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) {
    //We have defined this (user$) because we need the state of user weather login or logout
    this.user$ = afAuth.authState;
   }

   login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
   }
   
   logout() {
    this.afAuth.auth.signOut();
   }

   get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(
        switchMap(user => {
        if (user) return this.userService.get(user.uid);
        return of(null);
      }));
  }
}
