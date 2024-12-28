import { Controller, Get } from '@nestjs/common';
import { MysqlUserService } from '@infra/datasources/mysql/mysql-user/mysql-user.service';

@Controller()
export class AppController {
  constructor(private readonly mySql: MysqlUserService) {}

  @Get()
  async getHello(): Promise<string> {
    // const test = await this.mySql.createUser({
    //   name: 'Salomao',
    //   phone: '5544988524242',
    //   uuid: '147929a3-71f9-4a81-8c1f-5e050b68fb94',
    // });

    // console.log(test);

    const result = await this.mySql.findAll();
    console.log(result);
    return 'Hello World!';
  }
}
