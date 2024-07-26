# OTP Manager

A simple library for managing OTPs for all your applications. It helps with the generation, storage and verification of OTPs.

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes.

### Installing

Requirements:

- Node.js
- NPM (Node.js package manager)

Install with:

    npm install otp-mgr

### How To Use

```javascript
const otp = require('otp-mgr');

const Purpose = {
  Register: 1,
  Login: 2,
  ResetPassword: 3,
  CricicalAction: 4,
};

const users = [
  { id: 1, email: 'john@gmail.com' },
  { id: 2, email: 'jane@gmail.com' },
  { id: 3, email: 'charles@gmail.com' },
];

const otpForJohnLogin = otp.generate(users[0].id, Purpose.Login);

console.log(otpForJohnLogin); // 4 digit OTP

const isValid = otp.verify(users[0].id, Purpose.Login, otpForJohnLogin);

console.log(isValid); // true

const isValidJane = otp.verify(users[1].id, Purpose.Login, otpForJohnLogin);

console.log(isValidJane); // false
```

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning.

## Authors

- **Rushabh Javeri** - [GitHub](https://github.com/rushabhhere)
- **Manan Gandhi** - [GitHub](https://github.com/MananGandhi1810)

## License

This project is licensed under the [MIT License](https://license.md/licenses/mit-license/)
