import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Ticket } from 'src/app/models/ticket';
import { Router } from '@angular/router';
import { plainToClass } from 'class-transformer';
import { User } from 'src/app/models/user';
import { IonSelect, ToastController } from '@ionic/angular';
import { RetrieveTicketService } from 'src/app/services/retrieve-ticket.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-split-ticket',
  templateUrl: './split-ticket.page.html',
  styleUrls: ['./split-ticket.page.scss'],
})
export class SplitTicketPage implements OnInit {
  participants: User[] = [{
    name: "Pippo",
  },
  { name: "Pluto" }]

  user: User
  ticket: Ticket = {
    products: [
      {
        name: "Pasta e patate e fagioli",
        quantity: 2,
        price: 1.1,
        participants: [this.user]
      }, {
        name: "Pasta",
        quantity: 2,
        price: 1.1,
        participants: []
      }, {
        name: "Pasta pesto panna saliccia sugo",
        quantity: 2,
        price: 1.1,
        participants: []
      }, {
        name: "Pasta",
        quantity: 2,
        price: 1.1,
        participants: []
      },
      {
        name: "Pasta e patate e fagioli",
        quantity: 2,
        price: 1.1,
        participants: []
      }, {
        name: "Pasta",
        quantity: 2,
        price: 1111111111.1,
        participants: []
      }, {
        name: "Pasta pesto panna saliccia sugo",
        quantity: 2,
        price: 1.1,
        participants: []
      }
    ],
    timestamp: 9999,
    owner: { name: "Pippo" },
    id: "aaa",
    participants: [{ name: "Pippo" }]
  }

  newProduct: Product;

  @ViewChild('mySelect', { static: true }) selectRef: IonSelect;



  constructor(
    private router: Router,
    private retrieveTicketService: RetrieveTicketService,
    private ticketService: TicketService,
    public toastController: ToastController,
  ) {
    this.newProduct = new Product()
  }

  ngOnInit() {
    try {
      this.ticket = plainToClass(Ticket, this.router.getCurrentNavigation().extras.state.ticket);
      console.log(this.ticket)
      this.participants = this.ticket.participants;
    } catch (error) {
    }
  }

  productIsReady(): boolean {
    return this.newProduct.name !== (undefined && '') && this.newProduct.price !== (undefined && '') && this.newProduct.quantity !== (undefined && '');
  }

  addProduct() {
    try {
      let newProduct = plainToClass(Product, this.newProduct);
      newProduct.participants = [];
      this.ticket.products.push(newProduct);
      this.newProduct = new Product();
    } catch {
      console.log('ERROR');
    }
  }

  deleteProduct(index: number, $event) {
    console.log($event);
    this.ticket.products.splice(index, 1);
  }

  addParticipant(product: Product, event) {
    let user: User = event.target.value[0] as User;
    product.participants.push(user);
  }


  async saveTicket() {
    try {
      this.ticketService.save(this.ticket)
      //this.retrieveTicketService.saveTicket(this.ticket)
      this.presentToast("Saved correctly").then(
        () => this.router.navigateByUrl("tabs/status")
      )
    } catch (error) {
      console.log(error)
      await this.presentToast("Error while saving")
      await this.presentToast(error)
    }
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
