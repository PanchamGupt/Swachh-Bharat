import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./components/signin/signin.component";
// import { TabsComponent } from './components/tabs/tabs.component';


import { MapComponent } from "./components/map/map.component";
import { TutorialComponent } from "./components/tutorial/tutorial.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { IssueTypeComponent } from './components/issue-type/issue-type.component';

const routes: Routes = [
    {
        path: "click-photo",
        loadChildren: () =>
            import("./home/home.module").then((m) => m.HomePageModule),
    },
    // {
    //   path: '',
    //   redirectTo: 'home',
    //   pathMatch: 'full'
    // },
    {
        path: 'tabs',
        loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
      },
    {
        path: "",
        component: SigninComponent,
    },
  

    // {
    //     // path: "map",
    //     // component: MapComponent,
    //     path: 'tabs',
    //     loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
    // },
    {
        path: "issue-type",
        component: IssueTypeComponent,
    },
    {
        path: "settings",
        component: SettingsComponent,
    },
    // {
    //     path: "past-reports",
    //     loadChildren: () =>
    //         import("./pages/past-reports/past-reports.module").then((m) => m.PastReportsPageModule),
    // },
    {
        path: "learn",
        component: TutorialComponent,
    },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },

  

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
