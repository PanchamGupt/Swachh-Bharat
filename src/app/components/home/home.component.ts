import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
    NativeGeocoder,
    NativeGeocoderOptions,
    NativeGeocoderResult,
} from "@ionic-native/native-geocoder/ngx";
import { AlertController } from "@ionic/angular";

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

    issue_1_class = "issue issue-1";
    issue_2_class = "issue issue-2";

    geoencoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5,
    };
    constructor(
        private router: Router,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private alertCtrl: AlertController
    ) {}

    ngOnInit() {
        this.getGeolocation();
    }

    getGeolocation() {
        this.geolocation
            .getCurrentPosition()
            .then((resp) => {
                this.latitude = resp.coords.latitude;
                this.longitude = resp.coords.longitude;
                this.accuracy = resp.coords.accuracy;
                console.log(this.latitude, this.longitude);
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
        } else {
            this.issue_2_class = "issue issue-2-selected";
            this.issue_1_class = "issue issue-1";
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
        this.showAlert();
        // this.router.navigate(["/map"]);
    }
}
