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
            console.log(this.userDetails);
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
      // .then((res) => this.router.navigate(['/']));
    }

    emailLogin(email: string, password: string) {
      return this._firebaseAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(credential => {
          console.log("USER LOGGGGGGGED IN");
          // this.notify.update('Welcome to Firestarter!!!', 'success');
          // return this.updateUserData(credential.user);
        })
        .catch(error => this.handleError(error));
    }

    private handleError(error: Error) {
      console.error(error);
      // this.notify.update(error.message, 'error');
    }
  

}
