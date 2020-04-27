import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import {IonSelect, PopoverController} from '@ionic/angular';
import { Product } from 'src/app/models/product';
import {ParticipantsPopoverComponent} from './participants-popover/participants-popover.component';

@Component({
  selector: 'app-ticket-product',
  templateUrl: './ticket-product.component.html',
  styleUrls: ['./ticket-product.component.scss'],
})
export class TicketProductComponent implements OnInit {

  constructor(private popoverController: PopoverController) {
  }

  @ViewChild('mySelect', { static: false }) selectRef: IonSelect;

  @Input()
  product: Product
  @Input()
  participants: User[]

  @Output()
  deleteProductChange = new EventEmitter<boolean>()

  @Input()
  viewMode = false;

  selected: boolean = false

  ngOnInit() {
  }

  openSelect() {
    this.selectRef.open();
  }

  addParticipant(product: Product, event) {
    console.log(product)
  }

  compareUser = (user1, user2) => {
    return user1.name === user2.name;
  };

  select() {
    this.selected = this.selected ? false : true
  }

  deleteProduct() {
    this.deleteProductChange.emit(true)
  }



  async presentPopover(ev: any, participants: User[]) {
    const popover = await this.popoverController.create({
      component: ParticipantsPopoverComponent,
      event: ev,
      componentProps: {participantList: participants},
      translucent: true
    });
    return await popover.present();
  }



}
