import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserFriends } from '../models/user-friends';
import { UserFriendsRepositoryService } from '../repositories/user-friends-repository.service';
import { UserRepositoryService } from '../repositories/user-repository.service';

@Injectable({
  providedIn: 'root'
})
export class UserFriendsService {
  userId: string
  userFriends: Observable<UserFriends>

  constructor(
    private userFriendsRepositoryService: UserFriendsRepositoryService,
    private userRepositoryService: UserRepositoryService,
  ) {
  }

  getUserFriends(userId: string): Observable<UserFriends> {
    return this.userFriendsRepositoryService.getUserFriends(userId)
  }

  async addFriend(friendId: string, userFriends: UserFriends) {
    let user: User = await this.userRepositoryService.getUser(friendId)
    console.log(user)
    userFriends.friends.push(user)
    this.userFriendsRepositoryService.updateUserFriends(this.userId, userFriends)
  }

  async removeFriend(friend: User, userFriends: UserFriends) {
    let index = userFriends.friends.findIndex(f => f.email === friend.email)
    console.log(index)
    userFriends.friends.splice(index, 1)
    this.userFriendsRepositoryService.updateUserFriends(this.userId, userFriends)
  }

  async searchFriend(friendId: string): Promise<User> {
    return await this.userRepositoryService.getUser(friendId)
  }
}
