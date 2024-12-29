class UserModel {
  id: number;
  name: string;
  phone: string;
  uuid: string;
  confirmationCode: string;

  constructor(id: number, name: string, phone: string, uuid: string) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.uuid = uuid;
  }

  static fromJson(data: any): UserModel {
    return new UserModel(data.id, data.name, data.phone, data.uuid);
  }

  static toJson(data: UserModel): any {
    return {
      id: data.id,
      name: data.name,
      phone: data.phone,
      uuid: data.uuid,
    };
  }
}

export default UserModel;
