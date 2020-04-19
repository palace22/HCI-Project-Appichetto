import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  selected: boolean = false

  constructor() { }

  ngOnInit() { }

  openSelect() {
    this.selectRef.open();
  }

  addParticipant(product: Product, event) {
    let user: User = event.target.value[0] as User
    console.log(product)
  }

  compareUser = (user1, user2) => {
    return user1.name === user2.name;
  };

  select() {
    this.selected = this.selected ? false : true
  }

}
