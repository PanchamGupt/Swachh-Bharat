import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
    NativeGeocoder,
    NativeGeocoderOptions,
    NativeGeocoderResult,
} from "@ionic-native/native-geocoder/ngx";
import { Storage } from "@ionic/storage";
import { AlertController, LoadingController } from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";
import { CollectorService } from "src/app/services/collector.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    address: string;
    lat;
    lng;
    loading: any;
    latitude: number;
    longitude: number;
    accuracy: number;
    location: any;
    user: any;
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
        private alertCtrl: AlertController,
        private service: CollectorService,
        public loadingController: LoadingController
    ) {}

    async presentLoading() {
        this.loading = await this.loadingController.create({
            cssClass: "my-custom-class",
            message: "Please wait...",
        });
        await this.loading.present();
    }

    ngOnInit() {
        this.getGeolocation();

        this.user = JSON.parse(localStorage.getItem("user"));
        if (!this.user) {
            this.router.navigate(["/map"]);
        }
        this.route.queryParams.subscribe((params) => {
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

                this.data.latitude = this.latitude;
                this.data.longitude = this.longitude;

                this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
            })
            .catch((error) => {
                // alert("Error getting location" + JSON.stringify(error));
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
                this.location = {
                    lat: result[0].latitude,
                    long: result[0].longitude,
                    sublocality: result[0].subLocality,
                    locality: result[0].locality,
                    city: result[0].subAdministrativeArea,
                    state: result[0].administrativeArea,
                    pincode: result[0].postalCode,
                };

                this.address = this.generateAddress(result[0]);
                // this.address = JSON.stringify(this.location)
            })
            .catch((error: any) => {
                console.log("Error");
                // alert("Error getting location" + JSON.stringify(error));
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
        const body = {
            collector_id: this.user.id,
            collector_name: this.user.name,
            reason: this.data.issue,
            address: this.address,
            lat: this.data.latitude,
            long: this.data.longitude,
            sublocality: this.location.sublocality,
            locality: this.location.locality,
            city: this.location.city,
            state: this.location.state,
            pincode: this.location.pincode,
            house: this.data.homeImage,
            waste: this.data.dustbinImage,
        };

        this.presentLoading()
        this.service.postReport(body).subscribe(
            async (data) => {
                this.loading.dismiss()
                console.log(data);
                this.showAlert();
            },

            (err) => {
                console.log("err", err);
            }
        );

        // this.network.onDisconnect().subscribe((data) => {
        //     console.log("Disconnected", data);

        //     if (this.localData === null) {
        //         this.storage.set("localData", [this.data]);
        //     } else {
        //         this.localData.push(this.data);
        //         this.storage.set("localData", this.localData);
        //     }

        //     // this.showAlert();
        // });

        // this.network.onConnect().subscribe(() => {
        //     console.log("connected", this.data);
        // });
    }
}
