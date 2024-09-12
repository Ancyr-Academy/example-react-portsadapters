import { IAlerter } from './alerter.ts';

type Message = {
  type: 'error';
  value: string;
};

export class RamAlerter implements IAlerter {
  public readonly messages: Message[] = [];

  error(message: string) {
    this.messages.push({ type: 'error', value: message });
  }
}
