import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { LoginPage } from './login.page';
import { RouterModule } from '@angular/router';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire'
import { LoginService } from '../services/login.service';
import { GoogleLoggedUserPipe } from '../pipe/google-logged-user.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: LoginPage }]),
  ],
  declarations: [LoginPage],
  providers: [UserRepositoryService, LoginService, GoogleLoggedUserPipe]
})
export class LoginPageModule { }
