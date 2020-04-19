import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImportTicketPage } from './import-ticket.page';
import { SelectMarketComponent } from './select-market/select-market.component';
import { SelectMethodComponent } from './select-method/select-method.component';
import { SelectParticipansComponent } from './select-participans/select-participans.component';
import { UserRepositoryService } from 'src/app/repositories/user-repository.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ImportTicketPage }])
  ],
  declarations: [
    ImportTicketPage,
    SelectMarketComponent,
    SelectMethodComponent,
    SelectParticipansComponent
  ],
  providers: [UserRepositoryService]
})
export class ImportTicketPageModule { }
