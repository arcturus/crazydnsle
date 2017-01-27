const fs = require('fs');
const express = require('express');
const app = express();

app.get('/dnsupdate/:alias/:ip', function (req, res) {
  const alias = req.params['alias'];
  const ip = req.params['ip'];
  const toRestore = `${ip}.${alias}`;
  console.log('Restoring ', toRestore);
  const file = `/tmp/${toRestore}`;
  if (fs.existsSync(file)) {
    //fs.unlinkSync(file);
  }
  res.send('ok');
});

app.get('/dnsupdate/:alias/:ip/:challenge', function (req, res) {
  const alias = req.params['alias'];
  const challenge = req.params['challenge'];
  const ip = req.params['ip'];
  const toRestore = `${ip}.${alias}`;
  console.log(`Adding challenge ${challenge} for ${toRestore}`);
  fs.writeFileSync(`/tmp/${toRestore}`, challenge);
  res.send('ok');
});

app.listen(4444, function () {
  console.log('Running dnsupdater');
});
