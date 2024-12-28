// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
global.console = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
