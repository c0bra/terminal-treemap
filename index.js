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

const chars = cliBoxes.single;
const NL = '\n';
const PAD = ' ';

function draw(matrix) {
	console.log(matrix.map(x => x.join('')).join(NL));
}

// Need to turn boxes with content into a matrix, which then gets concatenated into a string of lines separated by newlines
function drawSquare(matrix, square) {
	const color = square.color ? square.color : chalk.reset;

	const y0 = Math.floor(square.y0);
	const y1 = Math.floor(square.y1);
	const x0 = Math.floor(square.x0);
	const x1 = Math.floor(square.x1);

	const width = Math.floor(x1 - x0);
	const height = Math.floor(y1 - y0);

	let lines = (new Array(height - 2));
	lines.fill(new Array(width).fill(PAD));

	const top = [chars.topLeft, ...chars.horizontal.repeat(width - 2), chars.topRight]; //.join('');
	const bottom = [chars.bottomLeft, ...chars.horizontal.repeat(width - 2), chars.bottomRight]; //.join('');

	const side = chars.vertical;
	const middle = lines.map(l => {
		l[0] = side;
		l[l.length-1] = side;
		return l;
	});

	// Insert text into middle of middle
	const text = ansiAlign(square.content);
	let textLines = text.split(NL);
	textLines = textLines.map(t => {
		const padding1 = ' '.repeat(Math.floor((width - 2 - stringWidth(t) - 1)/2));
		let padding2 = ' '.repeat(width - 2 - stringWidth(t) - stringWidth(padding1));

		return [side, padding1, ...t.split(''), padding2, side].join('');
	});

	const middleMiddle = Math.floor(middle.length / 2);
	middle.splice(middleMiddle, textLines.length, ...textLines);

	const rows = [top, ...middle, bottom];

	let row = 0;
	for (let ri = y0; ri < y1; ri++) {
		let col = 0;
		for (let ci = x0; ci < x1; ci++) {
			matrix[ri][ci] = color(rows[row][col]);
			col++;
		}

		row++;
	}
}

module.exports = (input, opts) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	opts = opts || { autocolor: true };

	let randomColors = [];
	if (opts.autocolor) randomColors = ['white', 'red', 'green', 'yellow', 'blue', 'cyan', 'magenta']

	const randomColor = () => randomColors.splice(Math.floor(Math.random() * randomColors.length), 1) || 'white';

	const data = [
		{
			content: 'Foo\n250kb',
			value: 50,
			color: opts.autocolor && chalk[randomColor()],
		},
		{
			content: 'Bar\n150kb',
			value: 25,
			color: opts.autocolor && chalk[randomColor()],
		},
		{
			content: 'Baz\n150kb',
			value: 5,
			color: opts.autocolor && chalk[randomColor()],
		},
		{
			content: 'Baz\n150kb',
			value: 5,
			color: opts.autocolor && chalk[randomColor()],
		}
	];

	const container = {x0: 0, y0: 0, x1: columns, y1: rows};

	const output = squarify(data, container);

	const matrix = new Array(rows).fill(null);
	for (const i in matrix) {
		matrix[i] = new Array(columns).fill('.');
	}

	for (const square of output) {
		drawSquare(matrix, square);
	}

	draw(matrix);
	return;
};
