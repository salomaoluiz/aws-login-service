class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public phone: string,
    public uuid: string,
    public confirmationCode?: string,
  ) {}
}

export default UserEntity;
