import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MediaModalPage } from '../components/media-modal/media-modal.page';
import { MenuComponent } from '../components/menu/menu.component';
import { SharedModule } from '../modules/shared/shared-module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [HomePage, MediaModalPage]
})
export class HomePageModule {}
