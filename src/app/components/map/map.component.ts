import { Component, OnInit, AfterContentInit, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { makeBindingParser } from '@angular/compiler';

declare var google:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
map:any;
@ViewChild('map',{read:ElementRef,static:false}) mapRef:ElementRef;

infoWindows:any=[];
markers:any=[
  {
    title:"National Art Gallery",
    latitude:'-17.824991',
    longitude:'31.049295'
  }
];

  constructor(private router:Router) { }

  ngOnInit() {}

ionViewDidEnter(){
  this.showMap();
}



showMap(){
  const location=new google.maps.LatLng(-17.824858,31.053028);
  const options={
    center:location,
    zoom:15,
    disableDefaultUI:true
  }
  this.map=new google.maps.Map(this.mapRef.nativeElement,options)
  console.log(this.map)
  this.addMarkersToMap(this.markers)
}


// Add Marker

addMarkersToMap(markers){
    for(let marker of markers){
      let position=new google.maps.LatLng(marker.latitude,marker.longitude);
      let mapMarker= new google.maps.Marker({
        position:position,
        title:marker.title,
        latitude:marker.latitude,
        longitude:marker.longitude
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }


  addInfoWindowToMarker(marker){
let infoWindowContent='<div id="content">'+
                       '<h2 id="firstHeading" class="firstHeading">' +marker.title +'</h2>'+
                       '<P>Latitude: ' +marker.latitude +'</p>'+
                       '<P>Longitude: ' +marker.longitude +'</p>'+
                       '</div>  '

  let infoWindow= new google.maps.infoWindow({
    content:infoWindowContent
  });

  marker.addListener('click',()=>{
    console.log("click")
    this.closeAllInfoWindows();
    infoWindow.open(this.map,marker);
  });
  this.infoWindows.push(infoWindow)
  }


  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
  }

  addReport(){
this.router.navigate(['/click-photo'])
  }


}
