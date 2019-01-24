import { AdminComponent } from './admin/admin.component';
import { AdminShowComponent } from './admin-show/admin-show.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StartComponent } from './start/start.component';
import { LandingComponent } from './landing/landing.component';
import { CityComponent } from './city/city.component';
import { StoreComponent } from './store/store.component';
import { RoadComponent } from './road/road.component';



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'city', component: CityComponent},
  {path: 'start', component: StartComponent},
  {path: 'store', component: StoreComponent},
  {path: 'road', component: RoadComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'show/:id', component: AdminShowComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
