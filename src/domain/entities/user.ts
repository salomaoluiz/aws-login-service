interface IUserEntity {
  id: number;
  name: string;
  phone: string;
  uuid: string;
  isConfirmed?: boolean;
  confirmationCode?: string;
}

class UserEntity {
  public id: number;
  public name: string;
  public phone: string;
  public uuid: string;
  public isConfirmed?: boolean;
  public confirmationCode?: string;

  constructor(props: IUserEntity) {
    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
    this.uuid = props.uuid;
    this.isConfirmed = props.isConfirmed;
    this.confirmationCode = props.confirmationCode;
  }
}

export default UserEntity;
