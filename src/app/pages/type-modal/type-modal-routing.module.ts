import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeModalPage } from './type-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TypeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeModalPageRoutingModule {}
