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

    constructor(private router: Router, private geolocation: Geolocation) {}

    ngOnInit() {}

    ionViewDidEnter() {
        this.getGeolocation();
    }

    //  //Get current coordinates of device
    getGeolocation() {
        this.geolocation
            .getCurrentPosition()
            .then((resp) => {
                this.latitude = resp.coords.latitude;
                this.longitude = resp.coords.longitude;
                this.accuracy = resp.coords.accuracy;
                console.log(this.latitude, this.longitude);
                this.showMap(this.latitude, this.longitude);
                // this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
            })
            .catch((error) => {
                alert("Error getting location" + JSON.stringify(error));
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
        console.log(this.map);
        this.addMarkersToMap([
            { title: "Current Location", latitude: lat, longitude: lng },
        ]);
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
                // icon: "../../assets/Company logo_v01.jpg"
            });
            mapMarker.setMap(this.map);
            this.addInfoWindowToMarker(mapMarker);
        }
    }

    addInfoWindowToMarker(marker) {
        let infoWindowContent =
            '<div id="content">' +
            '<h2 id="firstHeading" class="firstHeading">' +
            marker.title +
            "</h2>" +
            "<P>Latitude: " +
            marker.latitude +
            "</p>" +
            "<P>Longitude: " +
            marker.longitude +
            "</p>" +
            "</div>  ";

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
    }
}
