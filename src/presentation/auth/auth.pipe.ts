import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { LoginWithPhoneDto } from '@presentation/auth/dto/login-with-phone.dto';
import { validate } from 'uuid';

@Injectable()
export class AuthPipe implements PipeTransform {
  _validatePhoneNumber(phoneNumber: string): boolean {
    return phoneNumber.match(/\d/g)?.length === 13;
  }

  _validateUuid(uuid: string): boolean {
    return validate(uuid);
  }

  transform(value: LoginWithPhoneDto) {
    if (!this._validatePhoneNumber(value.phoneNumber)) {
      throw new HttpException(
        "Invalid phone number, follow the pattern '5544911112222'",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this._validateUuid(value.uuid)) {
      throw new HttpException('Invalid uuid', HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}
