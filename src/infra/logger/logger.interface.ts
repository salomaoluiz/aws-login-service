export interface ILogger {
  info(message: string): void;
  error(message: string, error?: Error): void;
  warn(message: string, error?: Error): void;
}
