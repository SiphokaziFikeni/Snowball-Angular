import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
// import { User } from '../users/shared/user.model';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // user = new User();
  userForm: FormGroup;
  // newUser: boolean = true; // to toggle login or signup form
  passReset: boolean = false;
  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email must be a valid email'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must be include at one letter and one number.',
      'minlength':     'Password must be at least 4 characters long.',
      'maxlength':     'Password cannot be more than 40 characters long.',
    }
  };

  constructor(private formBuilder: FormBuilder, public route: ActivatedRoute, public router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  // toggleForm(): void {
  //   this.newUser = !this.newUser;
  // }

  // toggleForm() {
  //   this.newUser = !this.newUser;
  // }

  // signup() {
  //   this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']);
  // }

  login() {
    const scope = this;
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
    .then( (results) => {
      
      scope.router.navigate(['dashboard']);
    });
  }

  // signup(): void {
  //   this.auth.emailSignUp(this.userForm.value)
  // }

  // login(): void {
  //   this.auth.emailLogin(this.userForm.value)
  // }

  // resetPassword() {
  //   this.auth.resetPassword(this.userForm.value['email'])
  //   .then(() => this.passReset = true)
  // }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      'email': ['', [
          Validators.required,
          Validators.email
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
    ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
