import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

export function saveToJson(file: string | string[], data)
{
	if (Array.isArray(file))
	{
		file = path.resolve(...file)
	}

	fs.writeFileSync(file, JSON.stringify(data));
}

Object.freeze(exports)
