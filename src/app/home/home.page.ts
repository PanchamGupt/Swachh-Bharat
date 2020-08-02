import { Component } from '@angular/core';
import {Camera,CameraOptions} from '@ionic-native/camera/ngx'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
currentImageHome="./../../assets/1.jpg"
currentImageDustBin="./../../assets/1.jpg"
  constructor(private camera:Camera,private router:Router) {}


  async tackPictureHome(){
    const option:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    };
try{
    const imageData= await this.camera.getPicture(option);

    this.currentImageHome="data:image/jpeg;base64," + imageData
}catch(err){
  console.log('error',err)
}
  }




  // 


  async tackPictureDustBin(){
    const option:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    };
try{
    const imageData= await this.camera.getPicture(option);

    this.currentImageDustBin="data:image/jpeg;base64," + imageData
}catch(err){
  console.log('error',err)
}
  }




  // 

  select(){
this.router.navigate(['/home'])
  }
}

