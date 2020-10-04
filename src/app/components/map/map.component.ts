import {
    Component,
    OnInit,
    AfterContentInit,
    ViewChild,
    ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { makeBindingParser } from "@angular/compiler";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
    NativeGeocoderOptions,
    NativeGeocoder,
    NativeGeocoderResult,
} from "@ionic-native/native-geocoder/ngx";
import { CollectorService } from "src/app/services/collector.service";
import { LoadingController } from "@ionic/angular";

declare var google: any;

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
    map: any;
    @ViewChild("map", { read: ElementRef, static: false }) mapRef: ElementRef;

    infoWindows: any = [];
    markers: any = [
        {
            title: "National Art Gallery",
            latitude: "26.4700414",
            longitude: "80.2902713",
        },
        {
            title: "National Art Gallery",
            latitude: "-17.834991",
            longitude: "31.049295",
        },
    ];

    latitude: number;
    longitude: number;
    accuracy: number;
    location: string;
    dateToday: String;
    user: any;
    loading: any;

    constructor(
        private router: Router,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private service: CollectorService,
        public loadingController: LoadingController
    ) {}

    ngOnInit() {
        this.dateToday = new Date().toDateString();
        this.user = JSON.parse(localStorage.getItem("user"));
        this.presentLoading();
        this.fetchReports();
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            cssClass: "my-custom-class",
            message: "Please wait...",
            duration: 3000,
        });
        await this.loading.present();
    }

    fetchReports() {
        this.service.fetchReports(this.user.id).subscribe((data) => {
            if (data.response.data.length) {
                const repo = data.response.data.map((report) => {
                    return {
                        title: report.reason,
                        latitude: report.lat,
                        longitude: report.long,
                    };
                });
                this.markers = repo;
                this.getGeolocation();
            } else {
                this.markers = [];
                this.getGeolocation();
            }
        });
    }

    ionViewDidEnter() {
        // this.getGeolocation();
    }

    geoencoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5,
    };

    getGeoencoder(latitude, longitude) {
        this.nativeGeocoder
            .reverseGeocode(latitude, longitude, this.geoencoderOptions)
            .then((result: NativeGeocoderResult[]) => {
                const location = {
                    lat: result[0].latitude,
                    long: result[0].longitude,
                    sublocality: result[0].subLocality,
                    locality: result[0].locality,
                    city: result[0].subAdministrativeArea,
                    state: result[0].administrativeArea,
                    pincode: result[0].postalCode,
                };
                this.location = location.sublocality
                    ? location.sublocality
                    : location.locality;
            })
            .catch((error: any) => {
                console.log("Error");
                // alert("Error getting location" + JSON.stringify(error));
            });
    }

    getGeolocation() {
        this.geolocation
            .getCurrentPosition()
            .then((resp) => {
                this.latitude = resp.coords.latitude;
                this.longitude = resp.coords.longitude;
                this.accuracy = resp.coords.accuracy;
                this.showMap(this.latitude, this.longitude);
                this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
            })

            .catch((error) => {
                this.showMap(26.4700414, 80.2902713);
            });
    }

    showMap(lat, lng) {
        const location = new google.maps.LatLng(lat, lng);
        const options = {
            center: location,
            zoom: 15,
            disableDefaultUI: true,
        };
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        this.addMarkersToMap(this.markers);
    }

    // Add Marker

    addMarkersToMap(markers) {
        for (let marker of markers) {
            let position = new google.maps.LatLng(
                marker.latitude,
                marker.longitude
            );
            let mapMarker = new google.maps.Marker({
                position: position,
                title: marker.title,
                latitude: marker.latitude,
                longitude: marker.longitude,
            });
            mapMarker.setMap(this.map);
            this.addInfoWindowToMarker(mapMarker);
        }
    }

    addInfoWindowToMarker(marker) {
        let infoWindowContent =
            "<div id='content' style='background-color': 'rgba(0, 0, 0, 0.75)'>" +
            '<h4 id="firstHeading" class="firstHeading">' +
            marker.title +
            "</h4>";

        let infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
        });

        marker.addListener("click", () => {
            console.log("click");
            this.closeAllInfoWindows();
            infoWindow.open(this.map, marker);
        });
        this.infoWindows.push(infoWindow);
    }

    closeAllInfoWindows() {
        for (let window of this.infoWindows) {
            window.close();
        }
    }

    addReport() {
        this.router.navigate(["/click-photo"]);
        // console.log("c");
        // this.router.navigate(["/home"]);
    }


    openProfile(){
        this.router.navigate(['/profile'])
    }
}
