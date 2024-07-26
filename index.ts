const otpMap = new Map();

type Generate = (userId: string, purpose: number) => number;
type Verify = (userId: string, purpose: number, enteredOtp: number) => boolean;

const generate: Generate = (userId, purpose) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  otpMap.set(`${userId}:${purpose}`, otp);
  return otp;
};

const verify: Verify = (userId, purpose, enteredOtp) => {
  const otp = otpMap.get(`${userId}:${purpose}`);
  return otp === enteredOtp;
};

export { generate, verify };
