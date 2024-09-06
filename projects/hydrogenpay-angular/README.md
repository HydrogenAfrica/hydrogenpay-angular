<p align="center">
<img width="400" valign="top" src="https://hydrogenpay.com/wp-content/uploads/2023/05/logo.png" data-canonical-src="https://hydrogenpay.com/wp-content/uploads/2023/05/logo.png" style="max-width:100%; ">
</p>

# <img width="35" valign="bottom" src="https://angular.io/assets/images/logos/angular/angular.svg"> Hydrogen Angular SDK

Hydrogen Angular SDK allows you to accept payment using in your Angular application

## Installation

Register for a merchant account on [Hydrogen Merchant Dashboard](https://dashboard.hydrogenpay.com) to get started.

```bash
npm install --save hydrogenpay-angular
```

```bash
yarn add hydrogenpay-angular
```

```bash
pnpm add hydrogenpay-angular
```

## Support

If you have any problems, questions or suggestions, create an issue here or send your inquiry to support@hydrogenpay.com

## Features

- Integrate as a Component
- Integrate as a Directive

## Requirements

Angular 17 and higher

## API Documentation

https://docs.hydrogenpay.com

## Implementation

You should already have your apiKey, If not, go to [https://dashboard.hydrogenpay.com](https://dashboard.hydrogenpay.com).

## Injecting the library

Import the `NgHydrogenModule` into your checkout module

```ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgHydrogenModule } from "hydrogen-angular";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgHydrogenModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Implementation in your Application

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "hydrogenpay-angular-example";

  options = {
    currency: "NGN", // REQUIRED
    description: "TEST", // OPTIONAL
    email: "test@emaildomain.com", // REQUIRED
    customerName: "test test", // REQUIRED
    amount: 500, // REQUIRED
    apiKey: "E2E411B102072296C73F76339497FB8529FF552F0D6817E0F3B46A243961CA21", // REQUIRED
    mode: "TEST", // REQUIRED
    isRecurring: false, // OPTIONAL
    frequency: 1, // OPTIONAL
    endDate: "2025-11-01", // OPTIONAL but (REQUIRED if isRecurring === true)
    meta: "test", // OPTIONAL
  };

  PaymentComplete(res: any) {
    const { response, closeModal } = res;
    console.log("response", response);

    setTimeout(() => {
      closeModal();
    }, 4000);
  }
  PaymentClose(response: any) {
    console.log("cancel");
    console.log(response);
  }
}
```

### Implementation in your Component Template

## As a Component

```html
<hydrogen-ng class="custom-class" (onSuccess)="PaymentDone($event)" (onClose)="PaymentCancel($event)" [options]="options"> Payment Modal as a Component </hydrogen-ng>
```

## As a Directive

```html
<button class="custom-class" hydrogen-ng (onSuccess)="PaymentDone($event)" (onClose)="PaymentCancel($event)" [options]="options">Payment Modal as a Component</button>
```

## Options Type

| Name         | Type       | Required | Desc                                                                        |
| ------------ | ---------- | -------- | --------------------------------------------------------------------------- |
| currency     | `String`   | Required | The currency for the transaction e.g NGN, USD                               |
| email        | `String`   | Required | The email of the user to be charged                                         |
| description  | `String`   | Optional | The transaction description                                                 |
| customerName | `String`   | Required | The fullname of the user to be charged                                      |
| amount       | `Number`   | Required | The transaction amount                                                      |
| apiKey       | `String`   | Required | Your apiKey or see above step to get yours                                   |
| onSuccess    | `Function` | Required | Callback when transaction is successful                                     |
| onClose      | `Function` | Required | Callback when transaction is closed of cancel                               |
| isRecurring  | `boolean`  | Optional | Recurring Payment                                                           |
| frequency    | `String`   | Optional | Recurring Payment frequency                                                 |
| mode         | `String`   | Required | Payment Mode e.g LIVE, TEST (default: TEST)                                 |
| endDate      | `String`   | Optional | Recurring Payment End Date. OPTIONAL but (REQUIRED when isRecurring = true) |
