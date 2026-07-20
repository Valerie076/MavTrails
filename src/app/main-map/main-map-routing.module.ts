import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainMapPage } from './main-map.page';

const routes: Routes = [
  {
    path: '',
    component: MainMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMapPageRoutingModule {}
