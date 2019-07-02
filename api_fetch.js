const request = require('request');

request('https://api-explorer.decent.ch/api/v1/assets/ALX', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.res.currentSupply);
});