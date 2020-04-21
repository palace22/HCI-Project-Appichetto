import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserFriendsRepositoryService } from '../repositories/user-friends-repository.service';
import { LoginService } from './login.service';
import { UserFriends } from '../models/user-friends';
import { Observable } from 'rxjs';
import { UserRepositoryService } from '../repositories/user-repository.service';

@Injectable({
  providedIn: 'root'
})
export class UserFriendsService {
  userId: string
  userFriends: Observable<UserFriends>

  constructor(
    private userFriendsRepositoryService: UserFriendsRepositoryService,
    private loginService: LoginService,
    private userRepositoryService: UserRepositoryService,
  ) {
    this.userId = "palazzolo1995@gmail.com"//loginService.getLoggedUser().email
    console.log(this.userId)
  }

  setLoggedUser() {
    this.userFriendsRepositoryService.setLoggedUser(this.userId)
    this.userFriends = this.userFriendsRepositoryService.getUserFriends()
  }

  getUserFriends(): Observable<UserFriends> {
    return this.userFriends
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
