import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgHydrogenModule } from 'hydrogenpay-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgHydrogenModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
