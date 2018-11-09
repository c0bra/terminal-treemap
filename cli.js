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

console.log(terminalTreemap(cli.input[0] || 'unicorns'));
