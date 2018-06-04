import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userListRef: AngularFireList<any>;
  userList: Observable<any>;
  selectedUser: User = new User();
  private basePath: string = '/users';

  constructor(private firebase : AngularFireDatabase) {
    this.userListRef = this.firebase.list('users');
    this.userList = this.userListRef.valueChanges();
   }

  getData(){
    this.userListRef = this.firebase.list('users');
    return this.userListRef;
  }

  insertUser(user : User){
    this.userListRef.push({
      name: user.name,
      email: user.email,
      password: user.password
    });
  }

  updateUser(user : User){
    this.userListRef.update(user.$key,
    {
      name: user.name,
      email: user.email,
      password: user.password
    })
  }

  deleteUser($key : string){
    this.userListRef.remove($key);
  }


}
