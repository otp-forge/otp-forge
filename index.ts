import crypto from "node:crypto";
import OTPStore from "./utils/store_template";

interface Config {
  purpose: string | number;
  otpLength?: 4 | 5 | 6 | 7 | 8;
  /**
   * Expiration time in seconds
   */
  expirationTime: number;
  store?: OTPStore;
}

type UserId = string | number;

type GenerateFunction = (userId: UserId) => Promise<number>;
type VerifyFunction = (userId: UserId, enteredOtp: number) => Promise<boolean>;

class OTPManager {
  constructor(private _config: Config) {
    this._config.otpLength = this._config.otpLength ?? 6;
  }

  private _otpMap = new Map<string, [number, Date]>();

  public generate: GenerateFunction = async (userId) => {
    const otpLength = this._config.otpLength as number;

    const otp = crypto.randomInt(
      Math.pow(10, otpLength - 1),
      Math.pow(10, otpLength)
    );

    if (!this._config.store) {
      this._otpMap.set(`${this._config.purpose}:${userId}`, [
        otp,
        new Date(Date.now() + this._config.expirationTime * 1000),
      ]);

      // clean up once expired
      setTimeout(() => {
        this._otpMap.delete(`${this._config.purpose}:${userId}`);
      }, this._config.expirationTime * 1000);
    } else {
      await this._config.store.set(
        `${this._config.purpose}:${userId}`,
        otp,
        this._config.expirationTime
      );
    }

    return otp;
  };

  public verify: VerifyFunction = async (userId, enteredOtp) => {
    let otp: [number, Date] | undefined;

    if (!this._config.store) {
      otp = this._otpMap.get(`${this._config.purpose}:${userId}`);
    } else {
      otp = await this._config.store.get(`${this._config.purpose}:${userId}`);
    }

    if (!otp) return false;

    const [otpValue, expirationTime] = otp;

    if (otpValue === enteredOtp && expirationTime > new Date()) {
      if (!this._config.store) {
        this._otpMap.delete(`${userId}:${this._config.purpose}`);
      } else {
        await this._config.store.del(`${this._config.purpose}:${userId}`);
      }
      return true;
    }

    return false;
  };
}

export { OTPManager, OTPStore };
