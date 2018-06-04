import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // userList: AngularFireList<any>;
  // userList: FirebaseListObservable<any> = null;

  userListRef: AngularFireList<any>;
  userList: Observable<any>;
  selectedUser: User = new User();
  private basePath: string = '/users';

  constructor(private firebase : AngularFireDatabase) {
    this.userListRef = this.firebase.list('users');
    this.userList = this.userListRef.valueChanges();

    this.getData();
   }

  getData(){
    console.log(this.userListRef[0]);
    //  this.userList = this.firebase.list('users');
    // this.userList = this.firebase.list(this.basePath, {
    //   ref => ref.orderByKey()
    // });
    // return this.userList;
  }

  insertUser(user : User){
    console.log("insertUser called in service");
    this.userListRef.push({
      email: user.email,
      password: user.password
    });
  }

  updateUser(user : User){
    this.userListRef.update(user.$key,
    {
      email: user.email,
      password: user.password
    })
  }

  deleteUser($key : string){
    this.userListRef.remove($key);
  }


}
