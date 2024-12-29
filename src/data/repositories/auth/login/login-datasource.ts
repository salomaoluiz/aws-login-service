interface ILoginDataSource {
  sendSMS(phone: string): Promise<void>;
}

export default ILoginDataSource;
