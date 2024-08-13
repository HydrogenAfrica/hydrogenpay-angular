import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hydrogenpay-angular-example';

  options = {
    currency: 'NGN',
    description: 'TEST',
    email: 'test@emaildomain.com',
    customerName: 'test test',
    amount: 500,
    token: 'E2E411B102072296C73F76339497FB8529FF552F0D6817E0F3B46A243961CA21', // replace this with your own public key from your Merchant Dashboard
    mode: 'TEST',
    isRecurring: false,
    frequency: 1,
    endDate: '2025-11-01',
  };

  PaymentComplete(res: any) {
    const { response, closeModal } = res;
    console.log('response', response);

    setTimeout(() => {
      closeModal();
    }, 4000);
  }
  PaymentClose(response: any) {
    console.log('cancel');
    console.log(response);
  }
}
