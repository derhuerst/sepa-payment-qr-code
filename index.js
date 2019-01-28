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

	if (isValidIBAN(data.payeeIBAN)) throw new Error('data.payeeIBAN must be a valid IBAN.')
	assertNonEmptyString(data.name, 'data.name')
	if ('bic' in data) assertNonEmptyString(data.bic, 'data.bic') // todo: validate

	if ('number' !== typeof data.amount) throw new Error('data.amount must be a number.')
	if (data.amount < 0.01 || data.amount > 999999999.99) {
		throw new Error('data.amount must be >=0.01 and <=999999999.99.')
	}
	if (!isCurrencyCode(data.currency)) {
		throw new Error('data.currency must be a valid currency code.')
	}

	if ('purposeCode' in data) {
		assertNonEmptyString(data.purposeCode, 'data.purposeCode')
		// todo: validate against AT-44
	}
	if ('structuredReference' in data) {
		assertNonEmptyString(data.structuredReference, 'data.structuredReference')
		// todo: validate against AT-05, validate <=35 chars
	}
	if ('unstructuredReference' in data) {
		assertNonEmptyString(data.unstructuredReference, 'data.unstructuredReference')
		// todo: validate <=140 chars
	}
	if (('structuredReference' in data) && ('unstructuredReference' in data)) {
		throw new Error('Use either data.structuredReference or data.unstructuredReference.')
	}
	if ('information' in data) {
		assertNonEmptyString(data.information, 'data.information')
		// todo: validate <=70 chars
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
