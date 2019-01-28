'use strict'

const a = require('assert')
const generateQrCode = require('.')

a.strictEqual(generateQrCode({
	name: 'Red Cross of Belgium',
	iban: 'BE72000000001616',
	bic: 'BPOTBEB1',
	amount: 123.45,
	reference: 'Urgency fund',
	purposeCode: 'abc',
	structuredReference: '123',
	information: 'foo bar'
}), `\
BCD
002
1
SCT
BPOTBEB1
Red Cross of Belgium
BE72000000001616
EUR123.45
abc
123

foo bar`)
