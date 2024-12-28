import { Injectable } from '@nestjs/common';
import ConsoleLogger from './console/logger';

@Injectable()
export class LoggerService extends ConsoleLogger {}
