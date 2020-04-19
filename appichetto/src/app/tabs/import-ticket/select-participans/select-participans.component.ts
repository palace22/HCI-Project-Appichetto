import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserRepositoryService } from 'src/app/repositories/user-repository.service';

@Component({
  selector: 'app-select-participans',
  templateUrl: './select-participans.component.html',
  styleUrls: ['./select-participans.component.scss'],
})
export class SelectParticipansComponent implements OnInit {
  friends: User[]
  participants: User[]

  constructor(private userRepositoryService: UserRepositoryService) {
    this.participants = new Array<User>()
  }

  ngOnInit() {
    this.friends = this.userRepositoryService.getFriends()
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
