import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoimagePipe } from '../noimage.pipe';



@NgModule({
  declarations: [NoimagePipe],
  exports: [NoimagePipe],
  imports: [
    CommonModule
  ]
})
export class CustomPipesModule { }
