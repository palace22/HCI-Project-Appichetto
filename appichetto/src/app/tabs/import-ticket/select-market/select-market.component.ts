import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-market',
  templateUrl: './select-market.component.html',
  styleUrls: ['./select-market.component.scss'],
})
export class SelectMarketComponent implements OnInit {
  market: string
  markets: Market[] = [
    { name: "Esselunga", icon: '../../../../assets/icon/Logo_esselunga.png' },
    { name: "Coop", icon: '../../../../assets/icon/1200px-Coop_italia_logo.svg.png' },
    { name: "Conad", icon: '../../../../assets/icon/Conad-Logo-1-.svg.png' },
  ]

  constructor() { }

  ngOnInit() { }

  updateMarket(market: Market): void {
    this.market = market.name
  }

  isSelected(market: Market): boolean {
    return this.market === market.name
  }
}

declare interface Market {
  name: string,
  icon: string,
}
