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
node generate-qr-code.js | qrencode -t ansiutf8 -l M
# prints QR code to the terminal
```

This library only generates the text input to be QR-encoded. Use the library of your choice to render the QR code to PNG/SVG/React/etc.

Note the following limitations posed by [European Payments Council's (EPC) *Quick Response Code: Guidelines to Enable Data Capture
for The Initiation of a Sepa Credit Transfer* document](https://www.europeanpaymentscouncil.eu/sites/default/files/KB/files/EPC069-12%20v2.1%20Quick%20Response%20Code%20-%20Guidelines%20to%20Enable%20the%20Data%20Capture%20for%20the%20Initiation%20of%20a%20SCT.pdf):

> 2 2D Code Guidelines
> Definition:
> - QR code error level `M` (15% of code words can be restored)
> - Maximum QR code version `13`, equivalent to module size `69` or 331 byte payload
> - Character sets:
> 	- UTF-8
> 	- ISO 8859-1
> 	- ISO 8859-2
> 	- ISO 8859-4
> 	- ISO 8859-5
> 	- ISO 8859-7
> 	- ISO 8859-10
> 	- ISO 8859-15


## See also

- [EPC QR code – Wikipedia](https://en.wikipedia.org/wiki/EPC_QR_code)
- [Quick Response Code: Guidelines to Enable Data Capture for the Initiation of a SEPA Credit Transfer – European Payments Council](https://www.europeanpaymentscouncil.eu/document-library/guidance-documents/quick-response-code-guidelines-enable-data-capture-initiation)
- [Credit Transfer Payment API – W3C](https://www.w3.org/TR/payment-method-credit-transfer/)


## Contributing

If you have a question or need support using `sepa-payment-qr-code`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/sepa-payment-qr-code/issues).
