import { Injectable } from '@angular/core';
// import { Router } from "@angular/router";

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

  // constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
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

    // emailSignUp(credentials: EmailPasswordCredentials): firebase.Promise<FirebaseAuthState> {
    //   return this.af.auth.createUser(credentials)
    //     .then(() => console.log("success"))
    //     .catch(error => console.log(error));
    // }
   
    // emailLogin(credentials: EmailPasswordCredentials): firebase.Promise<FirebaseAuthState> {
    //    return this.af.auth.login(credentials,
    //      { provider: AuthProviders.Password,
    //        method: AuthMethods.Password
    //       })
    //      .then(() => console.log("success"))
    //      .catch(error => console.log(error));
    // }

    // emailSignUp(email: string, password: string) {
    //   return this._firebaseAuth.auth
    //     .createUserWithEmailAndPassword(email, password)
    //     .then(credential => {
    //       console.log("user created" + credential.user)
    //       // this.notify.update('Welcome to Firestarter!!!', 'success');
    //       // return this.updateUserData(credential.user); // if using firestore
    //     })
    //     .catch(error => this.handleError(error));
    // }

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
