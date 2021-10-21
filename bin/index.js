#! /usr/bin/env node

const engineer = require('@satelite/engineer');

let [,, command, ...keys ] = process.argv;

if(command === 'init'){
    keys = keys[0] || 'init';
}

engineer[command || 'init'](keys);
