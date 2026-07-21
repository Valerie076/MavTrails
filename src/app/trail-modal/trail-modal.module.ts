import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrailModalPageRoutingModule } from './trail-modal-routing.module';

import { TrailModalPage } from './trail-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrailModalPageRoutingModule
  ],
  declarations: [TrailModalPage]
})
export class TrailModalPageModule {}
