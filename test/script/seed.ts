import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

let buf = Array.from(crypto.randomBytes(0x100));

const file = 'seed.json';

fs.writeFile(path.join(__dirname, '../..', file), JSON.stringify(buf), function (err)
{
	console.log(`[done] create ${file}`);
});
