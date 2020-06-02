# Readline_Logger
Node.js readline based simple logging utility.

## Benefits Over console.log
This logger is made to work with readline. It will preserve current text being inputted and not write on the same line as texting being written. <br>
It does not show up rl.on('line') and works with rl prompt.

## Note
This is not meant to replace console.log with normal use. It is to be used while using readline.

## How To Use
Require the file to get the logger class :
```javascript
const LoggerClass = require('./logger.js');
```
Make a new logger object :
```javascript
const Logger = new LoggerClass();
```
You can then use the library :
```javascript
const log = Logger.logger;
const rl = Logger.rl;
const readline = Logger.readline;

rl.on('line', (text) => {
 log(`Got this input ${text}`);
});

log.color('Program started!', 'green');
```

## Complete Examples
(No pass rl)
```javascript
const log = (new ( require('./logger.js') )()).logger;
const rl = log.rl;
const readline = log.readline;

log('Hello!');
```
(Pass rl)
```javascript
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const log = (new ( require('./logger.js') )(rl)).logger;

log('Hello!');
```

## Arguments
```javascript
const LoggerClass = require('./logger.js');
const Logger = new LoggerClass(args);
```
If `args` is blank then the Logger will create a readline instance. <br>
If `args` is a non readline interface object it will pass that object as a parameter to `readline.createInterface`. <br>
If `args` is a readline interface the Logger will use that.

## Logger
`log(text)` <br>
`log.warn(text, suppressStackTrace)` <br>
`log.error(text, suppressStackTrace)` <br>
`log.color(text, color)` <br>

## Colors
`reset` - Resets colors (used internally) <br>
`reset` <br>
`black` <br>
`red` <br>
`green` <br>
`yellow` <br>
`blue` <br>
`magenta` <br>
`cyan` <br>
`white`
