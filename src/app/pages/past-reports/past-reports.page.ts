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
    date
    dates=[]
    noOfDays
    constructor(
        private service: CollectorService,
        private loadingController: LoadingController
    ) {}

    ngOnInit() {
        const today=new Date()
        this.date=today.getDate()
        this.noOfDays= new Date(today.getFullYear(),today.getMonth()+1, 0).getDate();
        console.log(this.noOfDays)
       this.generateDates(this.date,0)

        this.user = JSON.parse(localStorage.getItem("user"));
        this.fetchReports();
    }

    generateDates(date,i){
        this.dates=[]
        const fromdate=date-3+i
        const toDate=fromdate+7
        for(let i=fromdate;i<toDate;i++){
          this.dates.push(i)
        }
      
        if(this.dates[0]===1){
              document.getElementById("pre").style.pointerEvents = "none";
              document.getElementById("pre").style.opacity = "0.5";
        
          document.getElementById("next").style.pointerEvents = "auto";
          document.getElementById("next").style.opacity = "1";
        }
        else if(this.dates[6]===this.noOfDays){
          document.getElementById("pre").style.pointerEvents = "auto";
              document.getElementById("pre").style.opacity = "1";
          
          document.getElementById("next").style.pointerEvents = "none";
          document.getElementById("next").style.opacity = "0.5";
        }
        else{
          document.getElementById("pre").style.pointerEvents = "auto";
          document.getElementById("pre").style.opacity = "1";
       
          document.getElementById("next").style.pointerEvents = "auto";
          document.getElementById("next").style.opacity = "";
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
			await this.loading.dismiss()
            if (data.response.data.length) {
                const reports = data.response.data;
                this.reports = reports;
            } else {
                console.log()
            }
        });
    }

    getDate(time) {
        return new Date(time).toDateString();
    }
}
