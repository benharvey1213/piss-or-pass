import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {

  displayName: string;

  lat: number;
  long: number

  type: string;
  cleanliness: string;
  classiness: string;
  convenience: string;
  purchase: boolean = false;

  locationName: string;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    this.auth.user.subscribe(event => this.displayName = event.displayName);

    this.getPosition().then((res) => {
      this.lat = res['lat'];
      this.long = res['lng'];
    });
   
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }

  onClickSubmit(){
    if (this.lat && this.long){
      this.firestore.collection('reviews').add({
        locationName: this.locationName,
        type: this.type,
        cleanliness: this.cleanliness,
        classiness: this.classiness,
        convenience: this.convenience,
        purchase: this.purchase,
        latitude: this.lat,
        longitude: this.long
  
      }).then(() => {
        this.locationName = "";
        this.type = "";
        this.cleanliness = "";
        this.classiness = "";
        this.convenience = "";
        this.purchase = false;

        this.router.navigateByUrl('/reviewcomplete');
      });
    }
  }

}
