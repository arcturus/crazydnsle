#!/usr/bin/env node

const program = require('commander');
const package = require('../package.json');
const fs = require('fs');
const ips = require('./ip.js');
const exec = require('child_process').execSync;


const SERVER = 'moom.pw';

program
  .command('alias <alias>')
  .description('Obtains certificates for the public name <local_ip>.<alias>.' + SERVER)
  .action(alias => {
    aliasValue = alias
    const name = `${ips.localIp}.${alias}.${SERVER}`;
    console.log(`Obtaining certificates for name ${name}`);

    // Write dehydrated/domains.txt to ask for the certificate of ${name}
    fs.writeFileSync(__dirname+ '/dehydrated/domains.txt', name);
    try {
      exec('cd client/dehydrated && ./dehydrated -c --hook ../hook.js');
      console.log('Search for certificates in ./client/dehydrated/certs/' + name);
    } catch (e) {
      console.error(e.stack);
      if (e.pid) {
        console.log('%s (pid: %d) exited with status %d', e.file, e.pid, e.status);
      }
    }
    
  });

program.parse(process.argv);
if (typeof aliasValue === 'undefined') {
  program.outputHelp();
}
