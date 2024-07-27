import crypto from 'node:crypto';

interface Config {
  purpose: string | number;
  otpLength?: 4 | 5 | 6 | 7 | 8;
  expirationTime: number;
}

type UserId = string | number;

type GenerateFunction = (userId: UserId) => number;
type VerifyFunction = (userId: UserId, enteredOtp: number) => boolean;

class OTPManager {
  constructor(private _config: Config) {
    this._config.otpLength = this._config.otpLength ?? 6;
  }

  private _otpMap = new Map<string, [number, Date]>();

  public generate: GenerateFunction = userId => {
    const otpLength = this._config.otpLength as number;

    const otp = crypto.randomInt(
      Math.pow(10, otpLength - 1),
      Math.pow(10, otpLength)
    );

    this._otpMap.set(`${this._config.purpose}:${userId}`, [
      otp,
      new Date(Date.now() + this._config.expirationTime),
    ]);

    // clean up once expired
    setTimeout(() => {
      this._otpMap.delete(`${this._config.purpose}:${userId}`);
    }, this._config.expirationTime * 1000);

    return otp;
  };

  public verify: VerifyFunction = (userId, enteredOtp) => {
    const otp = this._otpMap.get(`${this._config.purpose}:${userId}`);

    if (!otp) return false;

    const [otpValue, expirationTime] = otp;

    if (otpValue === enteredOtp && expirationTime > new Date()) {
      this._otpMap.delete(`${userId}:${this._config.purpose}`);
      return true;
    }

    return false;
  };
}

export default OTPManager;
