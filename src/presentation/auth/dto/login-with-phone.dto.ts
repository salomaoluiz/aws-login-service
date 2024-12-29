import { ApiProperty } from '@nestjs/swagger';

export class LoginWithPhoneDto {
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  uuid: string;
}
