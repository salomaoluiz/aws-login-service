import { Response } from 'express';
import { Controller, Post, Body, Res, UseGuards, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthPipe } from './auth.pipe';
import { ConfirmDto } from './dto/confirm.dto';
import { UpdateDto } from './dto/update.dto';
import { AuthGuard } from '@interceptors/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body(new AuthPipe()) loginWithPhoneDto: LoginDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.login(loginWithPhoneDto);

    return res.status(result.status).json(result.body).send();
  }

  @Post('/confirm')
  async confirm(@Body() confirmDto: ConfirmDto, @Res() res: Response) {
    const result = await this.authService.confirm(confirmDto);

    return res.status(result.status).json(result.body).send();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put('/update')
  async update(@Body() updateDto: UpdateDto, @Res() res: Response) {
    // const result = await this.authService.update(updateDto);

    return res.status(200).json({ teste: 123 }).send();
    // return res.status(result.status).json(result.body).send();
  }
}
