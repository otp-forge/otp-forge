abstract class OTPStore {
  /**
   *
   * @param key
   * @returns [otp, expirationTime] or undefined if not found
   */
  abstract get(key: string): Promise<[number, Date] | undefined>;

  /**
   *
   * @param key
   * @param value
   * @param ttl OTP expiration time in seconds
   */
  abstract set(key: string, value: number, ttl: number): Promise<null>;

  abstract del(key: string): Promise<null>;
}

export default OTPStore;
