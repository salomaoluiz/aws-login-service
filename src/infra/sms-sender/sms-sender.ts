export interface ISMSSender {
  sendSMS(phone: string, message: string): Promise<void>;
}
