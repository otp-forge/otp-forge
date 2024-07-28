# OTP Forge

A simple library for managing OTPs for all your applications. It helps with the generation, storage and verification of OTPs.

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes.

### Installing

Requirements:

- Node.js
- NPM (Node.js package manager)

Install with:

NPM:

```bash
npm install @otp-forge/otp-forge
```

Yarn:

```bash
yarn add @otp-forge/otp-forge
```

PNPM:

```bash
pnpm add @otp-forge/otp-forge
```

pnpm

### How To Use

Initialize the OTPManager with the required configuration options:

```javascript
const OTPManager = require("@otp-forge/otp-forge");

// In memory storage
const passwordResetOTPManager = new OTPManager({
  // Configuration options
  purpose: "password-reset", // Purpose of the OTP
  otpLength: 6, // Length of the OTP
  expirationTime: 300, // Time to live in seconds
});
```

Generate an OTP:

```typescript
const otp: number = await passwordResetOTPManager.generateOTP();
```

Verify an OTP:

```typescript
const isValid: boolean = await passwordResetOTPManager.verifyOTP(otp);
```

**Warning**: The default store is in-memory, which means that the OTPs will be lost when the application is restarted. To use a persistent store, you can use one of the supported stores or build your own.

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning.

## Authors

- **Rushabh Javeri** - [GitHub](https://github.com/rushabhhere)
- **Manan Gandhi** - [GitHub](https://github.com/MananGandhi1810)

## License

This project is licensed under the [MIT License](https://license.md/licenses/mit-license/)
