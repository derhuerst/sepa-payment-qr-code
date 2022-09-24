'use strict'

const isCurrencyCode = require('is-currency-code')
const {isValid: isValidIBAN, electronicFormat: serializeIBAN} = require('iban')

const SERVICE_TAG = 'BCD'
const VERSION = '002'
const CHARACTER_SET = 1
const IDENTIFICATION_CODE = 'SCT'

const assertNonEmptyString = (val, name) => {
	if ('string' !== typeof val || !val) {
		throw new Error(name + ' must be a non-empty string.')
	}
}

const defaults = {
	currency: 'EUR'
}

const generateQrCode = data => {
	if (!data) throw new Error('data must be an object.')
	data = Object.assign(Object.create(null), defaults, data)

	// > AT-21 Name of the Beneficiary
	assertNonEmptyString(data.name, 'data.name')
	if (data.name.length > 70) throw new Error('data.name must have <=70 characters')

	// > AT-23 BIC of the Beneficiary Bank
	if ('bic' in data) {
		assertNonEmptyString(data.bic, 'data.bic')
		if (data.bic.length > 11) throw new Error('data.bic must have <=11 characters')
		// todo: validate more?
	}

	// > AT-20 Account number of the Beneficiary
	// > Only IBAN is allowed.
	assertNonEmptyString(data.iban, 'data.iban')
	if (!isValidIBAN(data.iban)) {
		throw new Error('data.iban must be a valid iban code.')
	}

	// > AT-04 Amount of the Credit Transfer in Euro
	if ('number' !== typeof data.amount) throw new Error('data.amount must be a number.')
	if (data.amount < 0.01 || data.amount > 999999999.99) {
		throw new Error('data.amount must be >=0.01 and <=999999999.99.')
	}
	// todo [breaking]: require EUR
	if (!isCurrencyCode(data.currency)) {
		throw new Error('data.currency must be a valid currency code.')
	}

	// > AT-44 Purpose of the Credit Transfer
	if ('purposeCode' in data) {
		assertNonEmptyString(data.purposeCode, 'data.purposeCode')
		if (data.purposeCode.length > 4) throw new Error('data.purposeCode must have <=4 characters')
		// todo: validate against AT-44
	}

	// > AT-05 Remittance Information (Structured)
	// > Creditor Reference (ISO 11649 RF Creditor Reference may be used)
	if ('structuredReference' in data) {
		assertNonEmptyString(data.structuredReference, 'data.structuredReference')
		if (data.structuredReference.length > 35) throw new Error('data.structuredReference must have <=35 characters')
		// todo: validate against AT-05
	}
	// > AT-05 Remittance Information (Unstructured)
	if ('unstructuredReference' in data) {
		assertNonEmptyString(data.unstructuredReference, 'data.unstructuredReference')
		if (data.unstructuredReference.length > 140) throw new Error('data.unstructuredReference must have <=140 characters')
	}
	if (('structuredReference' in data) && ('unstructuredReference' in data)) {
		throw new Error('Use either data.structuredReference or data.unstructuredReference.')
	}

	// > Beneficiary to originator information
	if ('information' in data) {
		assertNonEmptyString(data.information, 'data.information')
		if (data.information.length > 70) throw new Error('data.information must have <=70 characters')
	}

	return [
		SERVICE_TAG,
		VERSION,
		CHARACTER_SET,
		IDENTIFICATION_CODE,
		data.bic, // todo: validate 8/11 chars
		data.name, // todo: validate <=70 chars
		serializeIBAN(data.iban),
		data.currency + data.amount.toFixed(2),
		data.purposeCode || '',
		data.structuredReference || '',
		data.unstructuredReference || '',
		data.information || ''
	].join('\n')
}

module.exports = generateQrCode
