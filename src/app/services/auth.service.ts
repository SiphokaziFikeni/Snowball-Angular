import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

   constructor(private _firebaseAuth: AngularFireAuth) {
      this.user = _firebaseAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
          }
          else {
            this.userDetails = null;
          }
        }
      );
   }

   isLoggedIn() {
    if (this.userDetails == null ) {
        return false;
      } else {
        return true;
      }
    }

    logout() {
      this._firebaseAuth.auth.signOut();
    }

    emailLogin(email: string, password: string) {
      return this._firebaseAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(credential => {
          //user log in successful
        })
        .catch(error => this.handleError(error));
    }

    resetPassword(emailAddress: string){
      var auth = this._firebaseAuth.auth;
  
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
    }

    private handleError(error: Error) {
      console.error(error);
    }
  

}
