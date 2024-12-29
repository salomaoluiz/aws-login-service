class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public phone: string,
    public uuid: string,
    public isConfirmed?: boolean,
    public confirmationCode?: string,
  ) {}
}

export default UserEntity;
