import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Ticket } from 'src/app/models/ticket';
import { Router } from '@angular/router';
import { plainToClass } from 'class-transformer';
import { User } from 'src/app/models/user';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-split-ticket',
  templateUrl: './split-ticket.page.html',
  styleUrls: ['./split-ticket.page.scss'],
})
export class SplitTicketPage implements OnInit {
  participants: User[] = [{
    name: "Pippo"
  }]

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
  }

  newProduct: Product

  @ViewChild('mySelect', { static: true }) selectRef: IonSelect;


  constructor(private router: Router) {
    this.newProduct = new Product()
  }

  ngOnInit() {
    try {
      this.ticket = plainToClass(Ticket, this.router.getCurrentNavigation().extras.state.ticket)
      this.participants = this.router.getCurrentNavigation().extras.state.participants
    } catch (error) {
    }
  }

  productIsReady(): boolean {
    return this.newProduct.name !== (undefined && "") && this.newProduct.price !== (undefined && "") && this.newProduct.quantity !== (undefined && "")
  }

  addProduct() {
    try {
      let newProduct = plainToClass(Product, this.newProduct)
      newProduct.participants = []
      this.ticket.products.push(newProduct)
      console.log(this.newProduct)
      this.newProduct = new Product()
    } catch{
      console.log("ERROR")
    }
  }

  deleteProduct(index: number, $event) {
    console.log($event)
    this.ticket.products.splice(index, 1)
  }

  openSelect() {
    this.selectRef.open();
  }

  closeSelect() {
    //this.selectRef.close();
  }

  addParticipant(product: Product, event) {
    let user: User = event.target.value[0] as User
    console.log(event.target.value[0])
    console.log(product)
    product.participants.push(user)
    console.log(product)
    console.log(this.ticket.products[1])

  }
}
