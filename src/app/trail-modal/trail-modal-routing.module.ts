import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrailModalPage } from './trail-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TrailModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrailModalPageRoutingModule {}
