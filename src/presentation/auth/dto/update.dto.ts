import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phoneNumber: string;
}
