import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    message: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
  });
  constructor() { }

  ngOnInit(): void {
  }
 sendMessage() {
    console.log(this.contactForm.value);

  }
}
