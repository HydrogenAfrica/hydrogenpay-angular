import {
  Component,
  Output,
  Input,
  EventEmitter,
  HostListener,
} from '@angular/core';
import {
  PrivateHydrogenPayOptions,
  HydrogenPayOptions,
} from './models/HydrogenPayOptions';
import { HydrogenService } from './hydrogen-service';

interface MyWindow extends Window {
  handlePgData: { (options: any, onSuccess: any, onClose: any) };
  handlePaymentStatus: { (transactionRef: any, tokens: any) };
  closeModal: { (transactionRef: any) };
}

declare var window: MyWindow;
@Component({
  selector: 'hydrogen-ng',
  template: `<button [ngClass]="class" [ngStyle]="style">
    <ng-content></ng-content>
  </button>`,
})
export default class HydrogenComponent {
  @Input() class: string;
  @Input() style: object;
  @Input() options: HydrogenPayOptions;
  @Output() onSuccess: EventEmitter<{ response: any; closeModal: any }> =
    new EventEmitter<{ response: any; closeModal: any }>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() validationError: EventEmitter<any> = new EventEmitter<any>();

  public _options: Partial<PrivateHydrogenPayOptions>;
  handleCancel: any;
  handleCallback: any;

  constructor(public hydrogenService: HydrogenService) {}

  generateOptions(obj: any) {
    this._options = this.hydrogenService.getOptions(obj);
    this.handleCancel = (...response: any) => {
      if (this.close.observers.length) {
        this.close.emit(...response);
      }
    };
    this.handleCallback = (response: any, closeModal: any) => {
      this.onSuccess.emit({ response, closeModal });
    };
  }
  validateInput(obj: HydrogenPayOptions) {
    if (!this.onSuccess.observers.length) {
      return "Hydrogen Payment: Insert a onSuccess callback function (onSuccess)='PaymentComplete($event)' to get payment status";
    }
    return this.hydrogenService.checkInput(obj);
  }

  checkStatus(token: string, transactionRef: string, callback) {
    let checkStatus: any;
    if (transactionRef && transactionRef !== 'Error in initiating payment') {
      checkStatus = setInterval(async function () {
        const checkPaymentStatus = await window.handlePaymentStatus(
          transactionRef,
          token
        );

        if (checkPaymentStatus?.status === 'Paid') {
          callback(checkPaymentStatus, () =>
            window?.closeModal({ transactionRef })
          );
          clearInterval(checkStatus);
        }
      }, 2000);
    } else {
      console.error(`ERROR: ${transactionRef}`);
    }
  }

  @HostListener('click')
  async buttonClick() {
    this.pay();
  }
  async pay() {
    const errorText = this.validateInput(this.options);
    this.generateOptions(this.options);
    if (errorText) {
      this.validationError.emit(errorText);
      return errorText;
    }
    await this.hydrogenService.loadScript(this.options.mode);
    const getRef = window.handlePgData(
      { ...this.options, isAPI: false },
      this._options.token,
      this.handleCancel
    );

    let token = this._options.token;

    //get payment reference
    const transactionRef = await getRef;
    this.checkStatus(token, transactionRef, this.handleCallback);
  }
}
