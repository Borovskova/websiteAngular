import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import {User} from "../user";
import {AuthenticationService} from "../authentication.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
  });
  constructor(private  auth: AuthenticationService) { }

  ngOnInit(): void {
  }
  signup() {
   return this.auth.signup(this.signupForm.value)
     .subscribe(usr => {
       
       console.log(usr);
     })
  }
}
