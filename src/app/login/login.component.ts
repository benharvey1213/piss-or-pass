import { Component, Input, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = null;

  // our login form group
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(public auth: AngularFireAuth) { }

  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => { location.href="" }).catch(err => { this.error = err });
  }

  login(email: string, password: string){ 
    this.auth.signInWithEmailAndPassword(email, password).then(success => { location.href="" }).catch(err => { this.error = err });
  }

  logout() {
    this.auth.signOut();
  }

  ngOnInit(): void {
    // if the user is already logged in, redirect back to home
    let userdata = null;
    this.auth.user.subscribe(event => userdata = event);
    if (userdata) {
      location.href="";
    }
  }

}
