import { Injectable } from '@angular/core';
import { HydrogenPayOptions } from './models/HydrogenPayOptions';

interface MyWindow extends Window {
  handlePgData: { (options: any, onSuccess: any, onClose: any) };
}

declare var window: MyWindow;

@Injectable({
  providedIn: 'root',
})
export class HydrogenService {
  constructor() {}

  loadScript(): Promise<void> {
    return new Promise((resolve) => {
      if (window.handlePgData) {
        resolve();
        return;
      }
      const script = window.document.createElement('script');
      window.document.head.appendChild(script);
      const onLoadFunc = () => {
        script.removeEventListener('load', onLoadFunc);
        resolve();
      };
      script.addEventListener('load', onLoadFunc);
      script.setAttribute(
        'src',
        'https://js.hydrogenpay.com/inline.js'
      );
    });
  }
  getOptions(obj: HydrogenPayOptions): HydrogenPayOptions {
    return {
      amount: obj.amount,
      apiKey: obj.apiKey,
      currency: obj.currency || 'NGN',
      description: obj.description,
      email: obj.email || '',
      customerName: obj.customerName || '',
      isApi: false,
      isRecurring: obj.isRecurring,
      frequency: obj.frequency,
      endDate: obj.endDate,
      meta: obj.meta,
      transactionRef: obj.transactionRef,
      metaData: obj.metaData,
    };
  }
  checkInput(obj: Partial<HydrogenPayOptions>): string {
    if (!obj.apiKey) {
      return 'Hydrogen Payment: Please insert your LIVE or TEST Api Key';
    }
    if (!obj.amount) {
      return 'Hydrogen Payment: Transaction amount is required';
    }
    return '';
  }
}
