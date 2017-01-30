const internalIp = require('internal-ip');
const cidrize = require('subnet2cidr');
const iprange = require('iprange');

const localIp = internalIp.v4();
const n = require('os').networkInterfaces()

const myNetmask = module.exports = function () {
  for(const k in n) {
    const inter = n[k]
    for(const j in inter)
      if(inter[j].family === 'IPv4' && !inter[j].internal)
        return inter[j].netmask
  }
}
const netmask = myNetmask();
const cidr = cidrize.toCIDR(netmask);

const ip = `${localIp}/${cidr}`;

var range = iprange(ip);
range.pop();
range = range.slice(1);

module.exports = {
  localIp,
  range
};
