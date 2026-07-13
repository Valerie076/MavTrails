import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({ projectId: "mavtrails", appId: "1:290039889060:web:e6c7b6afd47144aef27a31", storageBucket: "mavtrails.firebasestorage.app", apiKey: "AIzaSyAw0zjkoiXOXSPUGsrcSHau7Ncwhfpw5E4", authDomain: "mavtrails.firebaseapp.com", messagingSenderId: "290039889060", measurementId: "G-NMG8J3XQGM", projectNumber: "290039889060", version: "2" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
