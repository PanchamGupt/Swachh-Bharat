import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
old
new
confirm
oldError=false
conError=false
  constructor(private router:Router) { }

  ngOnInit() {}

  changePassword(){

this.router.navigate(['/'])

  }

}
