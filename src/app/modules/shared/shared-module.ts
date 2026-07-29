import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { AppModule } from 'src/app/app.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class SharedModule { }
