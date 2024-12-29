interface IJwt {
  sign(payload: unknown, options?: { expires_in: string }): string;
  verify(token: string): any;
}

export default IJwt;
