'use strict'

const a = require('assert')
const generateQrCode = require('.')

const ex1 = {
	name: 'Red Cross of Belgium',
	iban: 'BE72000000001616',
	bic: 'BPOTBEB1',
	amount: 123.45,
	reference: 'Urgency fund',
	purposeCode: 'abc',
	structuredReference: '123',
	information: 'foo bar'
}

a.strictEqual(generateQrCode(ex1), `\
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

// missing data.iban
{
	const ex2 = {...ex1}
	delete ex2.iban
	a.throws(() => {
		generateQrCode(ex2)
	}, 'throws with missing data.iban')
}

// invalid data.iban
{
	a.throws(() => {
		generateQrCode({
			...ex1,
			iban: 'BE00000000000000',
		})
	}, 'throws with invalid data.iban')
}

// omitted amount
a.strictEqual(generateQrCode({
	...ex1,
	amount: null,
}), `\
BCD
002
1
SCT
BPOTBEB1
Red Cross of Belgium
BE72000000001616

abc
123

foo bar`)

console.info('seems to work ✓')
