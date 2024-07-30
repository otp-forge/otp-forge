import { expect, test } from 'vitest'
import { OTPManager } from '../index'

test("Default behaviour", async () => {
    const otpManager = new OTPManager({
        purpose: "Test",
        otpLength: 6,
        expirationTime: 60
    });

    const otp: number = await otpManager.generate("TestUser");
    const isValid: boolean = await otpManager.verify("TestUser", otp);

    expect(isValid).toBe(true);
})

test("Testing expiration", { timeout: 5000 }, async () => {
    const otpManager = new OTPManager({
        purpose: "Test",
        otpLength: 6,
        expirationTime: 1
    });

    const otp: number = await otpManager.generate("TestUser");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isValid: boolean = await otpManager.verify("TestUser", otp);

    expect(isValid).toBe(false);
})

test("Testing deletion after verification", async () => {
    const otpManager = new OTPManager({
        purpose: "Test",
        otpLength: 6,
        expirationTime: 60
    });

    const otp: number = await otpManager.generate("TestUser");

    await otpManager.verify("TestUser", otp);

    const isValid: boolean = await otpManager.verify("TestUser", otp);

    expect(isValid).toBe(false);
})
