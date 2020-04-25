import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//  import { StatusPageRoutingModule } from './status-routing.module';

import { StatusPage } from './status.page';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      RouterModule.forChild([{path: '', component: StatusPage}])
  ],
  declarations: [StatusPage]
})
export class StatusPageModule {}
