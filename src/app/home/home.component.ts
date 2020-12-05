import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayName: string;

  constructor(private auth: AngularFireAuth) { }

  logout() {
    this.auth.signOut();
  }

  ngOnInit(): void {
    this.auth.user.subscribe(event => this.displayName = event.displayName);
    console.log("Display Name:", this.displayName);
  }
}
