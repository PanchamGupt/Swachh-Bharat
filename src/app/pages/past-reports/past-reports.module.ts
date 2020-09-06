import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastReportsPageRoutingModule } from './past-reports-routing.module';

import { PastReportsPage } from './past-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastReportsPageRoutingModule
  ],
  declarations: [PastReportsPage]
})
export class PastReportsPageModule {}
