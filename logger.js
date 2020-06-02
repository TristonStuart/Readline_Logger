/*
  Readline Based logger
  By : Triston Stuart
*/

const version = "1.0.1";

const ErrorStrings = [
  'Argument passed is not a readline interface! To generate a readline interface pass no arg or a object with an "input" and "output" property.'
]

const colors = {
  reset: "\x1b[0m",
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m"
}

function refresh(rl, oldPrompt){
  rl._refreshLine();
  rl.clearLine();
  rl.setPrompt( (oldPrompt)? oldPrompt : '> ' );
}

function checkArg(arg){
  if (arg){

    if (arg.constructor){
      if (arg.constructor.name == 'Interface'){
        return 'rl';
      }
    }
    if (typeof arg == Object){
      if (arg.input && arg.output){
        return 'readline-constructor-arg';
      }
    }

  }else {
    return 'readline-constructor-blank';
  }

  return 'unknown';
}


class Logger{

  constructor(arg){

    let argType = checkArg(arg);
    let rl = {};
    let readline = {};

    if (argType == 'rl'){
      rl = arg;
    }else if (argType == 'readline-constructor-arg'){
      readline = require('readline');
      try {
        this.rl = readline.createInterface(arg);
      }catch (e){
        throw e;
        return e;
      }
    }else if (argType == 'readline-constructor-blank'){
      readline = require('readline');
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    }else {
      let err = new Error( ErrorStrings[0] );
      throw err;
      return err;
    }

    this.logger = function(text){
      let line = rl.line;
      let oldPrompt = rl._prompt;
      rl.setPrompt('');
      rl.line = text;
      refresh(rl, oldPrompt);
      rl.write(line);
      return text;
    }

    this.logger.warn = function(text, nostack){
      text = (nostack)? colors.yellow + '[Warn] ' + text + colors.reset : colors.yellow + ((new Error).stack).replace('Error', '[Warn] ' + text) + colors.reset;
      let line = rl.line;
      let oldPrompt = rl._prompt;
      rl.setPrompt('');
      rl.line = text;
      refresh(rl, oldPrompt);
      rl.write(line);
      return text;
    }

    this.logger.error = function(text, nostack){
      text = (nostack)? colors.red + '[Error] ' + text + colors.reset : colors.red + ((new Error).stack).replace('Error', '[Error] ' + text) + colors.reset;
      let line = rl.line;
      let oldPrompt = rl._prompt;
      rl.setPrompt('');
      rl.line = text;
      refresh(rl, oldPrompt);
      rl.write(line);
      return text;
    }

    this.logger.color = function(text, color){
      let newText = '';
      try {
        newText = colors[color.toLowerCase()] + text + colors.reset;
        return this(newText);
      }catch (e){
        throw e;
        return e;
      }
    }

    this.version = version;
    this.logger.version = version;
    this.rl = rl;
    this.logger.rl = rl;
    this.readline = readline;
    this.logger.readline = readline;
  }

}

module.exports = Logger;
