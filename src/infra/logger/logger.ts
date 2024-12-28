import { Injectable } from '@nestjs/common';
import ConsoleLogger from '@infra/logger/console/logger';

@Injectable()
export class Logger extends ConsoleLogger {}
