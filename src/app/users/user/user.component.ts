import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  email;
  constructor(public userService: UserService, private toaster: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(userForm: NgForm) {
    if (userForm.value.$key == null)
      this.userService.insertUser(userForm.value);
    else
      this.userService.updateUser(userForm.value);
   
    this.resetForm(userForm);
    this.toaster.success('Submitted Succcessfully', 'User Added');
  }

  resetForm(userForm?: NgForm) {
    if (userForm != null)
      userForm.reset();

    this.userService.selectedUser = {
      $key: null,
      name: '',
      email: '',
      age: 0
    }
  }

}
