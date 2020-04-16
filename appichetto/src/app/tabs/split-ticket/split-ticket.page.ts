import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Ticket } from 'src/app/models/ticket';
import { Router } from '@angular/router';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-split-ticket',
  templateUrl: './split-ticket.page.html',
  styleUrls: ['./split-ticket.page.scss'],
})
export class SplitTicketPage implements OnInit {
  ticket: Ticket = {
    products: [
      {
        name: "Pasta e patate e fagioli",
        quantity: 2,
        price: 1.1,
        participants: []
      }, {
        name: "Pasta",
        quantity: 2,
        price: 1.1,
        participants: []
      }, {
        name: "Pasta pesto panna saliccia sugo",
        quantity: 2,
        price: 1.1,
        participants: [{ name: "Pippo" }]
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
        participants: [{ name: "Pippo" }]
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
        price: 1.1,
        participants: []
      }, {
        name: "Pasta pesto panna saliccia sugo",
        quantity: 2,
        price: 1.1,
        participants: [{ name: "Pippo" }]
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
        price: 1.1,
        participants: []
      }, {
        name: "Pasta pesto panna saliccia sugo",
        quantity: 2,
        price: 1.1,
        participants: [{ name: "Pippo" }]
      }, {
        name: "Pasta",
        quantity: 2,
        price: 1.1,
        participants: []
      },
    ],
    timestamp: 9999,
  }

  product: Product

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
    try{
    let newProduct = plainToClass(Product, this.product)
    this.ticket.products.push(newProduct)
    console.log(this.product)
    this.product = new Product()
    }catch{
      console.log("ERROR")
    }
  }

  deleteProduct(index: number) {
    this.ticket.products.splice(index, 1)
  }
}
