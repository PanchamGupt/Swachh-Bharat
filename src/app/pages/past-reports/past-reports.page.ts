import { Component, OnInit } from "@angular/core";
import { CollectorService } from "src/app/services/collector.service";
import { environment } from "src/environments/environment";
import { ViewDidEnter, LoadingController } from "@ionic/angular";

@Component({
    selector: "app-past-reports",
    templateUrl: "./past-reports.page.html",
    styleUrls: ["./past-reports.page.scss"],
})
export class PastReportsPage implements OnInit, ViewDidEnter {
    user: any;
    reports = [];
    loading;
    constructor(
        private service: CollectorService,
        private loadingController: LoadingController
    ) {}

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.fetchReports();
    }

    ionViewDidEnter() {}
    async presentLoading() {
        this.loading = await this.loadingController.create({
            cssClass: "my-custom-class",
            message: "Please wait...",
        });
        await this.loading.present();
    }

    getImage(image) {
        console.log(`${environment.base_url}/${image}`);
        return `${environment.base_url}/${image}`;
    }

    fetchReports() {
        this.presentLoading();
        this.service.fetchReports(this.user.id).subscribe(async (data) => {
			await this.loading.dismiss()
            if (data.response.data.length) {
                const reports = data.response.data;
                this.reports = reports;
				console.log("Rep", reports);
				
            } else {
            }
        });
    }

    getDate(time) {
        return new Date(time).toDateString();
    }
}
