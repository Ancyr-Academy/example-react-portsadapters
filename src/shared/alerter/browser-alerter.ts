import { IAlerter } from './alerter.ts';

export class BrowserAlerter implements IAlerter {
  error(message: string) {
    alert(message);
  }
}
