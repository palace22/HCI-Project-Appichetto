import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserRepositoryService } from 'src/app/repositories/user-repository.service';
import { UserFriendsService } from 'src/app/services/user-friends.service';

@Component({
  selector: 'app-select-participants',
  templateUrl: './select-participants.component.html',
  styleUrls: ['./select-participants.component.scss'],
})
export class SelectParticipantsComponent implements OnInit {
  friends: User[]
  @Input()
  participants: User[]

  constructor(private userFriendsService: UserFriendsService) {
  }

  ngOnInit() {
    this.userFriendsService.getUserFriends().subscribe(userFriends => this.friends = userFriends.friends)
  }

  updateParticipants(user: User) {
    let index: number = this.participants.indexOf(user)
    if (index === -1)
      this.participants.push(user)
    else
      this.participants.splice(index, 1)
  }

  isSelected(user: User): boolean {
    return this.participants.includes(user)
  }

}
