import { Component ,OnInit} from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Router ,NavigationExtras} from "@angular/router";
import { Storage } from '@ionic/storage';
@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit{
    currentImageHome = "./../../assets/1.jpg";
    currentImageDustBin = "./../../assets/1.jpg";
   

    constructor(private camera: Camera, private router: Router,private storage:Storage) {}

    housePictureButtonText: String = "Take the picture of house address"
    wastePictureButtonText: String = "Take the picture of mixed waste/dustbin"


    ngOnInit() {

       
    }


    async tackPictureHome() {
        const option: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
        };
        try {
            const imageData = await this.camera.getPicture(option);
            this.housePictureButtonText = "Retake Image"
            
            this.currentImageHome = "data:image/jpeg;base64," + imageData;
           
            // this.storage.set('image', this.currentImageHome);
        } catch (err) {
            console.log("error", err);
        }
    }

    //

    async tackPictureDustBin() {
        const option: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
        };
        try {
            const imageData = await this.camera.getPicture(option);
            this.wastePictureButtonText = "Retake Image"

            this.currentImageDustBin = "data:image/jpeg;base64," + imageData;
        } catch (err) {
            console.log("error", err);
        }
    }

    //

    select() {
      
        let navigationExtras: NavigationExtras = {
            state: {
                homeImage:this.currentImageHome,
                dustbinImage:this.currentImageDustBin
            }
          };
        
      
        this.router.navigate(["/home"],navigationExtras);
    }
}
