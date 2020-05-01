import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {NavParams, PopoverController} from '@ionic/angular';
import {TicketService} from '../../../../services/ticket.service';

@Component({
  selector: 'app-pay-popover',
  templateUrl: './pay-popover.component.html',
  styleUrls: ['./pay-popover.component.scss'],
})
export class PayPopoverComponent implements OnInit {

  friend: User;

  debt: number;
  credit: number;
  total: number;

  showSpinner = false;
  showSuccess = false;

  constructor(private navParams: NavParams, private popoverController: PopoverController, private ticketService: TicketService) {
    this.friend = navParams.get('friend');

    this.total = navParams.get('total');
    this.credit = navParams.get('credit');
    this.debt = navParams.get('debt');
  }

  ngOnInit() {
  }

  pay() {
    // this.ticketService.payDebtTicket();
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.showSuccess = true;
    }, 4000)
  }

}
