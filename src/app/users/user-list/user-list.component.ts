import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[];

  constructor(private userService: UserService, private toaster: ToastrService) { }

  ngOnInit() {
    var userData = this.userService.getData();

    userData.snapshotChanges().subscribe(item => {
      this.userList = [];

      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.userList.push(y as User);
      });
    });
  }

  onEdit(user: User) {
    this.userService.selectedUser = Object.assign({}, user);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this user?') == true) {
      this.userService.deleteUser(key);
      this.toaster.warning("Deleted Successfully", "User Register");
    }
  }


}
