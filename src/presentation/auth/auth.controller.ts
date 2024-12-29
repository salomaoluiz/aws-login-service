import { Response, Request } from 'express';
import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  UseGuards,
  Put,
  HttpCode,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginPipe } from './pipes/login.pipe';
import { ConfirmDto } from './dto/confirm.dto';
import { UpdateDto } from './dto/update.dto';
import { AuthGuard } from '@interceptors/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdatePipe } from '@presentation/auth/pipes/update.pipe';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body(new LoginPipe()) loginWithPhoneDto: LoginDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.login(loginWithPhoneDto);

    return res.status(result.status).json(result.body).send();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/')
  async getUser(
    @Res() res: Response,
    @Req() req: Request & { user: { user_id: number } },
  ) {
    const result = await this.authService.getUser(req.user.user_id);

    return res.status(result.status).json(result.body).send();
  }

  @Post('/confirm')
  async confirm(@Body() confirmDto: ConfirmDto, @Res() res: Response) {
    const result = await this.authService.confirm(confirmDto);

    return res.status(result.status).json(result.body).send();
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put('/update')
  async update(
    @Body(new UpdatePipe()) updateDto: UpdateDto,
    @Res() res: Response,
    @Req() req: Request & { user: { user_id: number } },
  ) {
    const result = await this.authService.update(req.user.user_id, updateDto);

    return res.status(result.status).json(result.body).send();
  }
}
