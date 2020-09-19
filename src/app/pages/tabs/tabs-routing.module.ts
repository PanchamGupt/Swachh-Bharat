import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

import { MapComponent } from 'src/app/components/map/map.component';



const routes: Routes = [
  {
    path: 'tab',
    component: TabsPage,
    children:[
      {path:'map', component:MapComponent},
      {
        path: 'past-reports',
     
        loadChildren: () => import('../past-reports/past-reports.module').then( m => m.PastReportsPageModule)
        // ,outlet: 'second',
      },
      // {path:'list', component:ListviewComponent}
    ]
  },{
    path:'',redirectTo:'/tab/map',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
