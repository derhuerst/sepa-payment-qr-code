# sepa-payment-qr-code

**Generate a [QR code to initiate a SEPA bank transfer](https://en.wikipedia.org/wiki/EPC_QR_code).**

[![npm version](https://img.shields.io/npm/v/sepa-payment-qr-code.svg)](https://www.npmjs.com/package/sepa-payment-qr-code)
[![build status](https://api.travis-ci.org/derhuerst/sepa-payment-qr-code.svg?branch=master)](https://travis-ci.org/derhuerst/sepa-payment-qr-code)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/sepa-payment-qr-code.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installation

```shell
npm install sepa-payment-qr-code
```


## Usage

```js
// generate-qr-code.js
const generateQrCode = require('sepa-payment-qr-code')

const qr = generateQrCode({
	name: 'Red Cross of Belgium',
	iban: 'BE72000000001616',
	amount: 123.45,
	reference: 'Urgency fund',
	information: 'Sample QR code'
})

process.stdout.write(qr)
```

```shell
node generate-qr-code.js | qrencode -t ansiutf8
# prints QR code to the terminal
```

This library only generates the text input to be QR-encoded. Use the library of your choice to render the QR code to PNG/SVG/React/etc.


## See also

- [EPC QR code – Wikipedia](https://en.wikipedia.org/wiki/EPC_QR_code)
- [Quick Response Code: Guidelines to Enable Data Capture for the Initiation of a SEPA Credit Transfer – European Payments Council](https://www.europeanpaymentscouncil.eu/document-library/guidance-documents/quick-response-code-guidelines-enable-data-capture-initiation)
- [Credit Transfer Payment API – W3C](https://www.w3.org/TR/payment-method-credit-transfer/)


## Contributing

If you have a question or need support using `sepa-payment-qr-code`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/sepa-payment-qr-code/issues).
