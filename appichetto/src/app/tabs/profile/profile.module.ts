import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { AddFriendsPopoverComponent } from './friends-list/add-friends-popover/add-friends-popover.component';
import { UserFriendsService } from 'src/app/services/user-friends.service';

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
  providers: [UserFriendsService]
})
export class ProfilePageModule { }
