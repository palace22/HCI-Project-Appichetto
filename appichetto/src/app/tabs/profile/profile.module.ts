import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { UserFriendsService } from 'src/app/services/user-friends.service';
import { AddFriendsPopoverComponent } from './friends-list/add-friends-popover/add-friends-popover.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ProfilePage }])
  ],
  declarations: [
    ProfilePage,
    FriendsListComponent,
    AddFriendsPopoverComponent,
  ],
  providers: [
    UserFriendsService,
    LoginService,
  ]
})
export class ProfilePageModule { }
