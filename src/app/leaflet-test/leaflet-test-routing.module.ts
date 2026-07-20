import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeafletTestPage } from './leaflet-test.page';

const routes: Routes = [
  {
    path: '',
    component: LeafletTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeafletTestPageRoutingModule {}
