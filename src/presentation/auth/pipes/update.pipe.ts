import { Injectable, PipeTransform } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateDto } from '@presentation/auth/dto/update.dto';

@Injectable()
export class UpdatePipe implements PipeTransform {
  _validatePhoneNumber(phoneNumber: string): boolean {
    return phoneNumber.match(/\d/g)?.length === 13;
  }

  transform(value: UpdateDto) {
    if (value.phoneNumber && !this._validatePhoneNumber(value.phoneNumber)) {
      throw new HttpException(
        "Invalid phone number, follow the pattern '5544911112222'",
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
