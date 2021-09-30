import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from "../authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  returnUrl: string;
  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.queryParams['returnUrl'] || '/';
  }

  login() {
    return this.auth.login(this.loginForm.value)
      .subscribe(usr => {
        this.router.navigate([this.returnUrl]);
        console.log(usr);
      })
  }
}
