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
    apiKey: 'PK_TEST_cca53e0b3bc7847aff94502b8a585f84', // replace this with your apikey
    isRecurring: false,
    frequency: 1,
    endDate: '2025-11-01',
    // mode: "TEST"
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
