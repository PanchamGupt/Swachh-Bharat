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
  date;
  dates = [];
  noOfDays;

  monthsName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  months;
  month;
  constructor(
    private service: CollectorService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    const today = new Date();
    this.month = today.getMonth();
    this.months = this.monthsName.slice(this.month - 1, this.month + 2);
    this.generateMonths(0);
    this.date = today.getDate();
    this.noOfDays = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    console.log(this.noOfDays);
    this.generateDates(this.date, 0);

    this.user = JSON.parse(localStorage.getItem("user"));
    this.fetchReports();
  }

  generateDates(date, i) {
    if (date < 4) {
      this.dates = [1, 2, 3, 4, 5, 6, 7];
    } else if (this.noOfDays == 31 && date >= 28) {
      this.dates = [25, 26, 27, 28, 29, 30, 31];
    } else if (this.noOfDays == 30 && date >= 27) {
      this.dates = [24, 25, 26, 27, 28, 29, 30];
    } else {
      this.dates = [];
      const fromdate = date - 3 + i;
      const toDate = fromdate + 7;
      for (let i = fromdate; i < toDate; i++) {
        this.dates.push(i);
      }
    }
    if (this.dates[0] === 1) {
      document.getElementById("pre").style.pointerEvents = "none";
      document.getElementById("pre").style.opacity = "0.5";

      document.getElementById("next").style.pointerEvents = "auto";
      document.getElementById("next").style.opacity = "1";
    } else if (this.dates[6] === this.noOfDays) {
      document.getElementById("pre").style.pointerEvents = "auto";
      document.getElementById("pre").style.opacity = "1";

      document.getElementById("next").style.pointerEvents = "none";
      document.getElementById("next").style.opacity = "0.5";
    } else {
      document.getElementById("pre").style.pointerEvents = "auto";
      document.getElementById("pre").style.opacity = "1";

      document.getElementById("next").style.pointerEvents = "auto";
      document.getElementById("next").style.opacity = "";
    }
  }

  generateMonths(i) {
    this.month = this.month + i;
    if (this.month === 0) {
      this.months = this.monthsName.slice(0, 3);
    } else if (this.month >= 10) {
      this.months = this.monthsName.slice(9, 12);
    } else {
      this.months = this.monthsName.slice(this.month - 1, this.month + 2);
    }

    if (this.month === 1) {
      document.getElementById("monthpre").style.pointerEvents = "none";
      document.getElementById("monthpre").style.opacity = "0.5";

      document.getElementById("monthnext").style.pointerEvents = "auto";
      document.getElementById("monthnext").style.opacity = "1";
    } else if (this.month === 10) {
      document.getElementById("monthpre").style.pointerEvents = "auto";
      document.getElementById("monthpre").style.opacity = "1";

      document.getElementById("monthnext").style.pointerEvents = "none";
      document.getElementById("monthnext").style.opacity = "0.5";
    }
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
    return `${environment.base_url}/${image}`;
  }

  fetchReports() {
    this.presentLoading();
    this.service.fetchReports(this.user.id).subscribe(async (data) => {
      await this.loading.dismiss();
      if (data.response.data.length) {
        const reports = data.response.data;
        this.reports = reports;
      } else {
        console.log();
      }
    });
  }

  getDate(time) {
    return new Date(time).toDateString();
  }
}
