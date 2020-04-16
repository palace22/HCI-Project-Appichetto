import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { LoginPage } from './login.page';
import { RouterModule } from '@angular/router';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: LoginPage }]),
  ],
  declarations: [LoginPage],
  providers: [UserRepositoryService]
})
export class LoginPageModule { }
