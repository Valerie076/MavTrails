import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeafletTestPageRoutingModule } from './leaflet-test-routing.module';

import { LeafletTestPage } from './leaflet-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeafletTestPageRoutingModule
  ],
  declarations: [LeafletTestPage]
})
export class LeafletTestPageModule {}
