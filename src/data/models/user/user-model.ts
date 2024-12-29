class UserModel {
  id: number;
  name: string;
  phone: string;
  uuid: string;
  confirmationCode: string;
  isConfirmed: boolean;

  constructor(
    id: number,
    name: string,
    phone: string,
    uuid: string,
    isConfirmed: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.uuid = uuid;
    this.isConfirmed = isConfirmed;
  }

  static fromJson(data: any): UserModel {
    return new UserModel(
      data.id,
      data.name,
      data.phone,
      data.uuid,
      data.isConfirmed,
    );
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
