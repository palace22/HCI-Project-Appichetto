import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

//  import { StatusPageRoutingModule } from './status-routing.module';

import {StatusPage} from './status.page';
import {RouterModule} from '@angular/router';
import {FriendTicketsComponent} from './friend-tickets/friend-tickets.component';
import {ExpandableComponent} from './expandable/expandable.component';
import { TicketProductComponent } from 'src/app/components/split-ticket/ticket-product/ticket-product.component';
import { ParticipantsPopoverComponent } from 'src/app/components/split-ticket/ticket-product/participants-popover/participants-popover.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: StatusPage}]),
        // SplitTicketPageModule
    ],
    declarations: [StatusPage, FriendTicketsComponent, TicketProductComponent, ParticipantsPopoverComponent, ExpandableComponent]
})
export class StatusPageModule {
}
