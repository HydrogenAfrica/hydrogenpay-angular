import { NgModule } from '@angular/core';
import HydrogenButtonDirective from './hydrogen.directive';
import HydrogenComponent from './hydrogen.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HydrogenButtonDirective, HydrogenComponent],
  imports: [CommonModule],
  exports: [HydrogenButtonDirective, HydrogenComponent],
})
export class NgHydrogenModule {}
