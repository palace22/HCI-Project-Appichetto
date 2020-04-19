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
  participants: User[] = [
    { name: "Pluto" },
    { name: "Pino" },
    { name: "Pippo" },
  ]
  user: User = { name: "Pluto" }
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
        participants: [this.participants[0]]
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
        participants: [this.participants[0], this.participants[1], this.participants[2]]
      }
    ],
    timestamp: 9999,
  }

  product: Product

  @ViewChild('mySelect', { static: true }) selectRef: IonSelect;


  constructor(private router: Router) {
    this.product = new Product()
  }

  ngOnInit() {
    try {
      this.ticket = plainToClass(Ticket, this.router.getCurrentNavigation().extras.state.ticket)
    } catch (error) {
    }
  }

  addProduct() {
    try {
      let newProduct = plainToClass(Product, this.product)
      this.ticket.products.push(newProduct)
      console.log(this.product)
      this.product = new Product()
    } catch{
      console.log("ERROR")
    }
  }


  deleteProduct(index: number) {
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
