#! /usr/bin/env node

const request = require('request');
const sleep = require('sleep');

const args = process.argv.slice(2);

const [command, qname, extra, challenge] = args;

if (!command || !qname || !challenge) {
  console.error('Insuficient parameters');
  process.exit(1);
}

var parts = qname.split('.');
parts.pop(); // .pw
parts.pop(); // .moom
const alias = parts.pop();
const ip = parts.join('.');

if (!alias) {
  console.log('Could not find alias');
  process.exit(1);
}

// console.log({
//   command,
//   qname,
//   alias,
//   challenge
// });

switch(command) {
  case 'deploy_challenge':
    fs=require('fs');
    console.log('Updating dns for challenge ', challenge);
    request(`http://moom.pw:4444/dnsupdate/${alias}/${ip}/${challenge}`, () => {
      // TODO check response ...
      console.log('Record updated waiting ...');
      sleep.sleep(1);
      process.exit(0);
    });
    break;
  case 'clean_challenge':
    fs=require('fs');
    console.log('Cleaning dns records');
    request(`http://moom.pw:4444/dnsupdate/${alias}/${ip}/`, () => {
      // TODO check response ...
      process.exit(0);
    });
    break;
}
