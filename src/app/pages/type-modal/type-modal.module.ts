import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeModalPageRoutingModule } from './type-modal-routing.module';

import { TypeModalPage } from './type-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeModalPageRoutingModule
  ],
  declarations: [TypeModalPage]
})
export class TypeModalPageModule {}
