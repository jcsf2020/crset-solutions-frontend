const crypto = require('crypto');
const [,, pw, salt] = process.argv;
if (!pw || !salt) { process.stderr.write('usage: node make_chat_hash.js <password> <salt>\n'); process.exit(1); }
process.stdout.write(crypto.scryptSync(pw, salt, 32).toString('hex'));
