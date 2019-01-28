'use strict'

const generateQrCode = require('.')

console.log(generateQrCode({
	name: 'Red Cross of Belgium',
	iban: 'BE72000000001616',
	amount: 123.45,
	reference: 'Urgency fund',
	information: 'Sample QR code'
}))
