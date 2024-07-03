const dns = require('node:dns/promises');

(async()=>{
    const result = await dns.lookup('facebook.com');
    console.log(result);
})();