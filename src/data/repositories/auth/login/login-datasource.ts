interface ILoginDataSource {
  sendSMS(phone: string): Promise<string>;
}

export default ILoginDataSource;
