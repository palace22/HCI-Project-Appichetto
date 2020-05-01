import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {GoogleLoggedUserPipe} from './pipe/google-logged-user.pipe';
import {FirebaseTicketPipe} from './pipe/firebase-ticket.pipe';
import {FirebaseDebtTicketPipe} from './pipe/firebase-debt-ticket.pipe';
import {AngularFireMessagingModule} from '@angular/fire/messaging';

@NgModule({
    declarations: [AppComponent, FirebaseTicketPipe, FirebaseDebtTicketPipe],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireMessagingModule,
        AngularFireAuthModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AngularFirestore,
        GoogleLoggedUserPipe,
        FirebaseTicketPipe,
        FirebaseDebtTicketPipe,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
