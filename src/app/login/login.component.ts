import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  formErrors = {
    'email': 'Enter valid email address',
    'password': 'Invalid password'
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

  login() {
    const scope = this;
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
    .then( (results) => {
        scope.router.navigate(['dashboard']);
    });
  }

  resetUserPassword() {
    var emailAddress = this.userForm.value['email'];
    this.auth.resetPassword(emailAddress);
  }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      email: [null, [
          Validators.required,
          Validators.email
        ]
      ],
      password: [null, [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
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
