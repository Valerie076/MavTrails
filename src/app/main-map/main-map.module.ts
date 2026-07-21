import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainMapPageRoutingModule } from './main-map-routing.module';

import { MainMapPage } from './main-map.page';
import { TrailModalPage } from '../components/trail-modal/trail-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainMapPageRoutingModule
  ],
  declarations: [MainMapPage, TrailModalPage]
})
export class MainMapPageModule {}
