import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { HydrogenService } from './hydrogen-service';
import {
  HydrogenPayOptions,
  PrivateHydrogenPayOptions,
} from './models/HydrogenPayOptions';
interface MyWindow extends Window {
  handlePgData: { (options: any, onSuccess: any, onClose: any) };
  handlePaymentStatus: { (transactionRef: any, apiKey: any) };
  closeModal: { (transactionRef: any) };
}
declare var window: MyWindow;
@Directive({
  selector: '[hydrogen-ng]',
})
export default class HydrogenButtonDirective {
  @Input() options: HydrogenPayOptions;
  @Output() onSuccess: EventEmitter<{ response: any; closeModal: any }> =
    new EventEmitter<{ response: any; closeModal: any }>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() validationError: EventEmitter<any> = new EventEmitter<any>();

  private _options: Partial<PrivateHydrogenPayOptions>;
  handleCancel: any;
  handleCallback: any;
  constructor(private hydrogenService: HydrogenService) {}

  async pay() {
    const errorText = this.validateInput(this.options);
    this.generateOptions(this.options);
    if (errorText) {
      console.error(errorText);
      this.validationError.emit(errorText);
      return errorText;
    }

    await this.hydrogenService.loadScript();
    const getRef = window.handlePgData(
      { ...this.options, isAPI: false },
      this._options.apiKey,
      this.handleCancel
    );

    let apiKey = this._options.apiKey;

    //get payment reference
    const transactionRef = await getRef;
    this.checkStatus(apiKey, transactionRef, this.handleCallback);
  }

  checkStatus(apiKey: string, transactionRef: string, callback) {
    let checkStatus: any;
    if (transactionRef && transactionRef !== 'Error in initiating payment') {
      checkStatus = setInterval(async function () {
        const checkPaymentStatus = await window.handlePaymentStatus(
          transactionRef,
          apiKey
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
  @HostListener('click')
  async buttonClick() {
    this.pay();
  }
}
