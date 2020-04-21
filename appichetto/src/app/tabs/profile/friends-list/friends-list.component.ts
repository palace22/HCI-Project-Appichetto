import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserFriendsService } from 'src/app/services/user-friends.service';
import { UserFriends } from 'src/app/models/user-friends';
import { Observable } from 'rxjs';
import { PopoverController, ToastController } from '@ionic/angular';
import { AddFriendsPopoverComponent } from './add-friends-popover/add-friends-popover.component';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent implements OnInit {
  userFriendsObs: Observable<UserFriends>
  userFriends: UserFriends

  constructor(
    private userFriendsService: UserFriendsService,
    private popoverController: PopoverController,
    public toastController: ToastController,
  ) {
    userFriendsService.setLoggedUser()
  }

  ngOnInit() {
    this.userFriendsObs = this.userFriendsService.getUserFriends()
    this.userFriendsObs.subscribe(userFriends => this.userFriends = userFriends)
  }

  remove(friend: User) {
    this.userFriendsService.removeFriend(friend, this.userFriends)
  }

  async add(ev: any) {
    const popover = await this.popoverController.create({
      component: AddFriendsPopoverComponent,
      event: ev,
      componentProps: { friend: undefined },
      cssClass: 'popover_class',
    });

    popover.present().then(() =>
      popover.onDidDismiss().then(async data => {
        let newFriend = data.data as User
        if (this.userFriends.friends.findIndex(friend => friend.email !== newFriend.email) !== -1) {
          await this.presentToast("Added correctly")
          this.userFriendsService.addFriend(newFriend.email, this.userFriends)
        } else {
          await this.presentToast("Can't add this user")
        }

      })
    )
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "middle",
    });
    toast.present();
  }
}
