import { ILogger } from '../logger.interface';

class ConsoleLogger implements ILogger {
  info(message: string, stackTrace?: unknown): void {
    console.log(message, stackTrace);
  }
  error(message: string, error?: Error, stackTrace?: unknown): void {
    console.error(message, error, stackTrace);
  }
  warn(message: string, error?: Error, stackTrace?: unknown): void {
    console.warn(message, error, stackTrace);
  }
}

export default ConsoleLogger;
