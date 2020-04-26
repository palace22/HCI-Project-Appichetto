import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { IonSelect } from '@ionic/angular';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-ticket-product',
  templateUrl: './ticket-product.component.html',
  styleUrls: ['./ticket-product.component.scss'],
})
export class TicketProductComponent implements OnInit {
  @ViewChild('mySelect', { static: false }) selectRef: IonSelect;

  @Input()
  product: Product
  @Input()
  participants: User[]

  @Output()
  deleteProductChange = new EventEmitter<boolean>()

  selected: boolean = false

  constructor() { }

  ngOnInit() { }

  openSelect() {
    this.selectRef.open();
  }

  compareUser = (user1: User, users: User[]) => {
    if (Array.isArray(users)) {
      return users.findIndex(user => user.email === user1.email) !== -1
    }
    // else {
    //   let userToCompare = user2 as User
    //   console.log(userToCompare)
    //   return user1.email === userToCompare.email
    // }
  };

  select() {
    this.selected = this.selected ? false : true
  }

  deleteProduct() {
    this.deleteProductChange.emit(true)
  }

}
