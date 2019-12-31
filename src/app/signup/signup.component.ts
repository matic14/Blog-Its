import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { format } from 'url';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  message = '';
  userError: any;

  constructor(public fb: FormBuilder , public authService: AuthService) {

  this.myForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required , Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {
    validator: this.checkIfMatchingPasswords('password', 'confirmPassword')
  });

   }

   checkIfMatchingPasswords(passwordKey: string , confirmPasswordKey: string) {
     return (group: FormGroup) => {
       const password = group.controls[passwordKey];
       const confirmPassword = group.controls[confirmPasswordKey];


       if (password.value === confirmPassword.value) {
         return;
       } else {
        confirmPassword.setErrors({
          notEqualToPassword: true
        });
       }
     };
   }

  onSubmit(signupform) {
     const email: string  = signupform.value.email;
     const password: string = signupform.value.password;
     const firstName: string = signupform.value.firstName;
     const lastName: string = signupform.value.lastName;

     this.authService.signup(email, password , firstName , lastName).then((user: any) => {

      firebase.firestore().collection('users').doc(user.uid)
      .set({
        firstName: signupform.value.firstName,
        lastName: signupform.value.lastName,
        email: signupform.value.email,
        photoURL: user.photoURL,
        interests: '',
        bio: '',
        hobbies: ''
      }).then(() => {
        this.message = 'You have been signed up successfully. Please login';
      });

     // tslint:disable-next-line: no-shadowed-variable
     }).catch(( error ) => {
       console.log(error);
       this.userError = error;
     });
  }

  ngOnInit() {
  }

}
