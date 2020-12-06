import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayName: string;

  constructor(private auth: AngularFireAuth) { }

  logout() {
    this.auth.signOut();
  }

  ngOnInit(): void {
    this.auth.user.subscribe(event => this.displayName = event.displayName);
    // console.log("Display Name:", this.displayName);
  }
}
