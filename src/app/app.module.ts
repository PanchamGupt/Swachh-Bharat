import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http"

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicStorageModule } from "@ionic/storage";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { Network } from "@ionic-native/network/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
		AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],

    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        NativeGeocoder,
        Network,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
