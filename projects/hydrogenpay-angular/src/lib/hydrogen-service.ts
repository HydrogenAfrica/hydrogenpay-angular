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

  loadScript(mode): Promise<void> {
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
        mode === 'LIVE'
          ? 'https://hydrogenshared.blob.core.windows.net/paymentgateway/paymentGatewayIntegration_v1PROD.js'
          : 'https://hydrogenshared.blob.core.windows.net/paymentgateway/paymentGatewayIntegration_v1.js'
      );
    });
  }
  getOptions(obj: HydrogenPayOptions): HydrogenPayOptions {
    return {
      amount: obj.amount,
      token: obj.token,
      currency: obj.currency || 'NGN',
      description: obj.description,
      email: obj.email || '',
      customerName: obj.customerName || '',
      mode: obj.mode || 'TEST',
      isApi: false,
      isRecurring: obj.isRecurring,
      frequency: obj.frequency,
      endDate: obj.endDate,
      meta: obj.meta,
    };
  }
  checkInput(obj: Partial<HydrogenPayOptions>): string {
    if (!obj.token) {
      return 'Hydrogen Payment: Please insert your Token';
    }
    if (!obj.amount) {
      return 'Hydrogen Payment: Transaction amount is required';
    }
    if (!obj.mode) {
      return 'Hydrogen Payment: Payment Mode amount is required (LIVE | TEST)';
    }
    return '';
  }
}
