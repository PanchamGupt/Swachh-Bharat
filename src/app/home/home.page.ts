import { Component } from '@angular/core';
import {Camera,CameraOptions} from '@ionic-native/camera/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
currentImage="./../../assets/1.jpg"
  constructor(private camera:Camera) {}


  async tackPicture(){
    const option:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    };
try{
    const imageData= await this.camera.getPicture(option);

    this.currentImage="data:image/jpeg;base64," + imageData
}catch(err){
  console.log('error',err)
}
  }
}

