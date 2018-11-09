'use strict';

const cliBoxes = require('cli-boxes');
const squarify = require('squarify').default;
const termSize = require('term-size');

module.exports = (input, opts) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	opts = opts || {};

	const data = [
		{
			name: 'Foo',
			value: 1
		},
		{
			name: 'Bar',
			value: 1
		}
	];

	const container = {x0: 0, y0: 0, x1: 100, y1: 100};

	const output = squarify(data, container);

	console.log(output);
};
