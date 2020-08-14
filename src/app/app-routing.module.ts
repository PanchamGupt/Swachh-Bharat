import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./components/signin/signin.component";
// import { TabsComponent } from './components/tabs/tabs.component';
import { HomeComponent } from "./components/home/home.component";
import { PastReportsComponent } from "./components/past-reports/past-reports.component";
import { MapComponent } from "./components/map/map.component";
import { TutorialComponent } from "./components/tutorial/tutorial.component";
import { SettingsComponent } from "./components/settings/settings.component";

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
        path: "",
        component: SigninComponent,
    },
    {
        path: "map",
        component: MapComponent,
    },
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "settings",
        component: SettingsComponent,
    },
    {
        path: "past-reports",
        component: PastReportsComponent,
    },
    {
        path: "learn",
        component: TutorialComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
