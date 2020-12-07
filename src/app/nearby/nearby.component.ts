import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit {

  lat: number;
  long: number;

  closeReviews = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    // first, get our coordinates
    this.getPosition().then((res) => {
      this.lat = res['lat'];
      this.long = res['lng'];

      // then, pull all reviews from firebase
      this.firestore.collection('reviews').get().subscribe((ss) => {
        ss.docs.forEach((doc) => {
  
          // check if within 5 miles with Haversine formula taken from
          // https://www.movable-type.co.uk/scripts/latlong.html
          const R = 6371e3; // meters
          const φ1 = this.lat * Math.PI / 180; // φ, λ in radians
          const φ2 = doc.data()['latitude'] * Math.PI/180;
          const Δφ = (doc.data()['latitude'] - this.lat) * Math.PI/180;
          const Δλ = (doc.data()['longitude'] - this.long) * Math.PI/180;
          const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          const d = R * c; // in meters
          const miles = d * 0.000621471

          console.log(doc.data())

          if (miles < 5){
            var distanceObject = {
              distance: miles,
              classiness: parseInt(doc.data()['classiness']),
              cleanliness: parseInt(doc.data()['cleanliness']),
              convenience: parseInt(doc.data()['convenience']),
              latitude: doc.data()['latitude'],
              longitude: doc.data()['longitude'],
              locationName: doc.data()['locationName'],
              purchase: doc.data()['purchase'],
              type: doc.data()['type']
            }

            this.closeReviews.push(distanceObject);
          }
        });

        // sort by distance
        this.closeReviews.sort(function(a, b) {
          return a.distance - b.distance;
        });

      });
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

}
