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
    email: 'user@example.com',
    customerName: 'test test',
    amount: 5,
    apiKey: "PK_LIVE_0b2cabb4fb3a020647e50b7f3c437767", //"PK_TEST_cca53e0b3bc7847aff94502b8a585f84",//'SK_LIVE_ad9614acf356f9c6d6b0dda5895aee33', //PK_TEST_cca53e0b3bc7847aff94502b8a585f84', // replace this with your apikey
    isRecurring: false,
    frequency: 5,
    endDate: '2026-05-09',
    transactionRef: this.generateTransactionRef(),
    metaData:[
				// { fieldName: "uniqueId", fieldDefaultValue: "DevStore14", fieldKey: "uniqueId", fieldType: 1 },
			]
  };

  generateTransactionRef(): string {
    return 'txn_' + Math.random().toString(36).substr(2, 9) + Date.now();
  }

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
