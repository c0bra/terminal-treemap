#!/usr/bin/env node
'use strict';
const meow = require('meow');
const terminalTreemap = require('.');

const cli = meow(`
	Usage
	  $ terminal-treemap [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ terminal-treemap
	  unicorns & rainbows
	  $ terminal-treemap ponies
	  ponies & rainbows
`);

const data = [
	{
		content: 'Foo\n250kb',
		value: 50,
	},
	{
		content: 'Bar\n150kb',
		value: 25,
	},
	{
		content: 'Baz\n150kb',
		value: 5,
	},
	{
		content: 'Baz\n150kb',
		value: 5,
	}
];

console.log(terminalTreemap(data || 'unicorns'));
