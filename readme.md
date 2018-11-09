# terminal-treemap [![Build Status](https://travis-ci.org/c0bra/terminal-treemap.svg?branch=master)](https://travis-ci.org/c0bra/terminal-treemap) [![codecov](https://codecov.io/gh/c0bra/terminal-treemap/badge.svg?branch=master)](https://codecov.io/gh/c0bra/terminal-treemap?branch=master)

> Treemaps in the terminal


## Install

```
$ npm install terminal-treemap
```


## Usage

```js
const terminalTreemap = require('terminal-treemap');

terminalTreemap('unicorns');
//=> 'unicorns & rainbows'
```


## API

### terminalTreemap(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global terminal-treemap
```

```
$ terminal-treemap --help

  Usage
    terminal-treemap [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ terminal-treemap
    unicorns & rainbows
    $ terminal-treemap ponies
    ponies & rainbows
```


## License

MIT © [Brian Hann](http://n/A)
