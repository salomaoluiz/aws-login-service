import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  uuid: string;
}
