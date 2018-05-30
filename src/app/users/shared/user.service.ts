import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: AngularFireList<any>;
  selectedUser: User = new User();

  constructor(private firebase : AngularFireDatabase) { }

  getData(){
    this.userList = this.firebase.list('users');
    return this.userList;
  }

  insertUser(user : User){
    this.userList.push({
      email: user.email,
      password: user.password
    });
  }

  updateUser(user : User){
    this.userList.update(user.$key,
    {
      email: user.email,
      password: user.password
    })
  }

  deleteUser($key : string){
    this.userList.remove($key);
  }


}
