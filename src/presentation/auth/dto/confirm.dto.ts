import { ApiProperty } from '@nestjs/swagger';

export class ConfirmDto {
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  confirmationCode: string;
}
