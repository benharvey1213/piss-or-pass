import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // our login form group
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    displayName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(public auth: AngularFireAuth) { }

  register(email: string, password: string) {
    if (this.form.valid) {
      this.auth.createUserWithEmailAndPassword(email, password)
      .then(
        (success) => {
          console.log("Successfully created user!")

          success.user.updateProfile({
            displayName: this.form.get('displayName').value
          }).then((val) => {console.log('Successfully updated display name!')}).catch((err) => { console.log(err);})
          
      }).catch(
        (err) => {
          console.log("Error creating user")
        }
      )
    }
  }

  ngOnInit(): void {
  }

}
