import { EventEmitter } from '@angular/core';

export interface HydrogenPayOptions {
  /**
   * Amount
   */
  amount: string | number;
  /**
   * Merchant Token
   */
  token: string;
  /**
   * Transaction currency
   */
  currency: string;
  /**
   * Transaction description
   */
  description?: string;
  /**
   * Customer email address
   */
  email?: string;
  /**
   * Customer phone number
   */
  phone?: string;
  /**
   * Customer Name e.g Jane Smith
   */
  customerName?: string;
  /**
   * Recurring Ferquency
   */
  frequency?: number;
  /**
   * Enable Recurrent
   */
  isRecurring?: boolean;
  /**
   * Recurrent End Date
   */
  endDate?: string;
  /**
   * Payment Mode
   */
  mode: 'TEST' | 'LIVE';
  isApi?: boolean;
  meta?: string;
}

export interface PrivateHydrogenPayOptions extends HydrogenPayOptions {
  /**
   * @param response?: The server response
   */
  onSuccess: (response?: any) => void;
  /**
   * A function to be called when the pay modal is closed.
   */
  onClose: (response?: any) => void;
}

export interface PrivateHydrogenPayOptionsWithEmitters
  extends HydrogenPayOptions {
  /**
   * A function to be called on successful card charge. User’s can always be redirected to a successful or
   * failed page supplied by the merchant here based on response
   */
  onSuccess: EventEmitter<any>;
  /**
   * A function to be called when the pay modal is closed.
   */
  onClose: EventEmitter<void>;
}
