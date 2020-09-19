import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CollectorService } from "src/app/services/collector.service";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
    selector: "app-signin",
    templateUrl: "./signin.component.html",
    styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
    id: String = "001";
    password: String = "abcdef";
    loading: any;

    constructor(
        private router: Router,
        private service: CollectorService,
        public loadingController: LoadingController,
        public alertController: AlertController
    ) {}

    ngOnInit() {
        const user = localStorage.getItem('user')
        if (user) {
            this.router.navigate(['/map'])
        }
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            cssClass: "my-custom-class",
            message: "Please wait...",
            duration: 2000,
        });
        await this.loading.present();
    }

    async presentAlert(message) {
        const alert = await this.alertController.create({
            header: "Error",
            message: message,
            buttons: ["OK"],
        });

        await alert.present();
    }

    read(n, e) {
        if (n === 0) {
            this.id = e.target.value;
        } else if (n === 1) {
            this.password = e.target.value;
        }
    }

    signIn() {
        this.router.navigate(["tabs/tab/map"]);
        this.presentLoading();
        console.log(this.id, this.password);
        this.service.login(this.id, this.password).subscribe(
            async (data) => {
                await this.loading.onDidDismiss();
                if (data.response.status === 200) {
                    localStorage.setItem('user', JSON.stringify(data.response.data))
                    this.router.navigate(["tabs/tab/map"]);
                } else {
                    console.log(data);
                    this.presentAlert("Login Failed");
                }
            },
            async (err) => {
                console.log(err);
                await this.loading.onDidDismiss();
                this.presentAlert("Something Went Wrong");
            }
        );
    }
}
