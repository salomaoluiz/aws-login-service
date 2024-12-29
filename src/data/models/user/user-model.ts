class UserModel {
  id: number;
  name: string;
  phone: string;
  uuid: string;
  confirmationCode: string;
  isConfirmed: boolean;

  constructor(props: {
    id: number;
    name: string;
    phone: string;
    uuid: string;
    isConfirmed: boolean;
    confirmationCode: string;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
    this.uuid = props.uuid;
    this.confirmationCode = props.confirmationCode;
    this.isConfirmed = props.isConfirmed;
  }

  static fromJson(data: any): UserModel {
    return new UserModel({
      id: data.id,
      name: data.name,
      phone: data.phone,
      uuid: data.uuid,
      confirmationCode: data.confirmationCode,
      isConfirmed: data.isConfirmed,
    });
  }

  static toJson(data: UserModel): any {
    return {
      id: data.id,
      name: data.name,
      phone: data.phone,
      uuid: data.uuid,
      isConfirmed: data.isConfirmed,
    };
  }
}

export default UserModel;
