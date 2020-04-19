import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplitTicketPage } from './split-ticket.page';
import { RouterModule } from '@angular/router';
import { TicketProductComponent } from './ticket-product/ticket-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: SplitTicketPage }])
  ],
  declarations: [
    SplitTicketPage,
    TicketProductComponent,
  ],

})
export class SplitTicketPageModule { }
