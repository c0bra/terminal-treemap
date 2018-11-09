'use strict';

const ansiAlign = require('ansi-align')
const chalk = require('chalk');
const cliBoxes = require('cli-boxes');
const boxen = require('boxen');
const squarify = require('squarify').default;
const stringWidth = require('string-width');
const termSize = require('term-size');

const columns = Math.floor(termSize().columns / 2);
const rows = Math.floor(termSize().rows / 2);

console.log(`TERMSIZE: ${rows}x${columns}`);

const chars = cliBoxes.single;
const NL = '\n';
const PAD = ' ';

// Need to turn boxes with content into a matrix, which then gets concatenated into a string of lines separated by newlines
function drawSquare(matrix, square) {
	const text = ansiAlign(square.content);

	const y0 = Math.floor(square.y0);
	const y1 = Math.floor(square.y1);
	const x0 = Math.floor(square.x0);
	const x1 = Math.floor(square.x1);

	console.log(square);

	// // Row
	// for (const ri = 1; ri <= rows; ri++) {
	// 	for (const ri = 1; ri <= rows; ri++) {
	// 		char = '';
	// 		if (ri === 1) {
	// 			// Top
	// 		} else if (ri === 1) {

	// 		} else if (ri === 1) {

	// 		}
	// 	}
	// }

	const width = Math.floor(x1 - x0);
	const height = Math.floor(y1 - y0);

	// let lines = text.split(NL);
	console.log(PAD.repeat(width));
	let lines = (new Array(height)); //.map(x => PAD.repeat(width));
	lines.fill(new Array(width).fill(PAD));

	const top = [chars.topLeft, ...chars.horizontal.repeat(width - 2), chars.topRight]; //.join('');
	const bottom = [chars.bottomLeft, ...chars.horizontal.repeat(width - 2), chars.bottomRight]; //.join('');

	const side = chars.vertical;
	const middle = lines.map(l => {
		l[0] = side;
		l[l.length-1] = side;
		return l;
	}); //.join(NL);

	const rows = [top, ...middle, bottom];

	let row = 0;
	for (let ri = y0; ri < y1; ri++) {
		let col = 0
		for (let ci = x0; ci < x1; ci++) {
			// console.log('m', matrix[ri]);
			// console.log('r', rows[row]);
			// console.log('mr', ri, ci)
			matrix[ri][ci] = rows[row][col];
			col++;
		}
		row++;
	}

	// console.log('MATRIX', matrix[0])
}

module.exports = (input, opts) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	opts = opts || {};

	const data = [
		{
			content: 'Foo\n250kb',
			value: 75,
		},
		{
			content: 'Bar\n150kb',
			value: 25,
		}
	];

	const container = {x0: 0, y0: 0, x1: columns, y1: rows};

	const output = squarify(data, container);

	const matrix = new Array(rows);
	matrix.fill(new Array(columns).fill(' '));

	for (const square of output) {
		drawSquare(matrix, square);
	}

	console.log(
		matrix
			.map(x => x.join(''))
			.join(NL)
	);
};
