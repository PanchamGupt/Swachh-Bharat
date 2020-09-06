import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastReportsPage } from './past-reports.page';

const routes: Routes = [
  {
    path: '',
    component: PastReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastReportsPageRoutingModule {}
