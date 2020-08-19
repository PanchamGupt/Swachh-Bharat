import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@ionic-native/native-geocoder/ngx";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  address: string;
  lat;
  lng;
  latitude: number;
  longitude: number;
  accuracy: number;
  localData = [];
  data = {
    homeImage: "",
    dustbinImage: "",
    longitude: null,
    latitude: null,
    issue: "",
  };
  issue_1_class = "issue issue-1";
  issue_2_class = "issue issue-2";

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private storage: Storage,
    private network: Network,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.getGeolocation();

    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (this.router.getCurrentNavigation().extras.state) {
        this.data.homeImage = this.router.getCurrentNavigation().extras.state.homeImage;
        this.data.dustbinImage = this.router.getCurrentNavigation().extras.state.dustbinImage;
      }
    });

    this.storage
      .get("localData")
      .then((localdata) => (this.localData = localdata));
  }

  getGeolocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.accuracy = resp.coords.accuracy;
        console.log(this.latitude, this.longitude);

        this.data.latitude = this.latitude;
        this.data.longitude = this.longitude;

        this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
      })
      .catch((error) => {
        alert("Error getting location" + JSON.stringify(error));
      });
  }

  selectIssue(i) {
    if (i === 1) {
      this.issue_2_class = "issue issue-2";
      this.issue_1_class = "issue issue-1-selected";
      this.data.issue = "Wet and Dry waste is mixed";
    } else {
      this.issue_2_class = "issue issue-2-selected";
      this.issue_1_class = "issue issue-1";
      this.data.issue = "Hazardous waste is mixed with other wastes";
    }
  }

  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder
      .reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        console.log("add");
        alert("Error getting location" + JSON.stringify(error));
      });
  }

  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length) address += obj[val] + ", ";
    }

    return address.slice(0, -2);
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: "Success",
      message: "Report added Successfully !",
      buttons: [
        {
          text: "Close",
          handler: () => {
            this.router.navigate(["/map"]);
          },
        },
      ],
    });
    await alert.present();
  }

  save() {
    // On network Unavailable
    this.network.onDisconnect().subscribe(() => {
      console.log("disconnected");
      if (this.localData === null) {
        this.storage.set("localData", [this.data]);
      } else {
        this.localData.push(this.data);
        this.storage.set("localData", this.localData);
      }

      this.showAlert();
    });

    // On network Available
    this.network.onConnect().subscribe(() => {
      console.log("connected", this.data);
    });
  }
}
