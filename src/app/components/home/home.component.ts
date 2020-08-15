import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
// Readable Address
address: string;
lat
lng
// Location coordinates
latitude: number;
longitude: number;
accuracy: number;

// Geocoder configuration
geoencoderOptions: NativeGeocoderOptions = {
  useLocale: true,
  maxResults: 5
};
  constructor(private router: Router, private geolocation: Geolocation , private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
    // this.currentLocation()
    this.getGeolocation()
   }


  //  //Get current coordinates of device
   getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.accuracy = resp.coords.accuracy;
console.log( this.latitude,this.longitude)
      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }


  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        // console.log(result)
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        console.log('add')
        alert('Error getting location' + JSON.stringify(error));
      });
  }




  // //Return Comma saperated address
  generateAddress(addressObj) {
    
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }

    return address.slice(0, -2);
  }

  // currentLocation(){

  
  // this.geolocation.getCurrentPosition(
  //   {maximumAge: 1000, timeout: 5000,
  //    enableHighAccuracy: true }
  //   ).then((resp) => {
  //         // resp.coords.latitude
  //         // resp.coords.longitude
  //         //alert("r succ"+resp.coords.latitude)
  //         alert(JSON.stringify( resp.coords));
    
  //         this.lat=resp.coords.latitude
  //         this.lng=resp.coords.longitude
  //         },er=>{
  //           //alert("error getting location")
  //           alert('Can not retrieve Location')
  //         }).catch((error) => {
  //         //alert('Error getting location'+JSON.stringify(error));
  //         alert('Error getting location - '+JSON.stringify(error))
  //         });

  //       }
  save() {
    this.router.navigate(['/map'])
  }
}
