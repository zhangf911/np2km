var fs = require('fs');
var path = require('path');
var np2km = require('./lib/np2km');
var optimist = require('optimist');

var argv = optimist
    .usage('$0 [name] [options]')
    .alias('v', 'version')
    .describe('v', 'Print version number and exit.')
    .wrap(80)
    .argv;

if (argv.version) {
    var json = require('./package.json');
    console.log('version %s-%s', json.name, json.version);
    return;
}

if (argv._.length >= 2) {
    console.log('Please specify a file name.');
    return;
}

var filename = argv._[0] || 'package.json';

var json = np2km(filename, argv);
var output = path.join(path.dirname(filename), json.data.text + '.km');
fs.writeFileSync(output, JSON.stringify(json));
console.log('%j np2km output complete.', filename);
