/**
 * Created by user on 2018/12/1/001.
 */

import { ARC4, seedFromUnsafeBuffer } from '../src';

let seed = 'a any type seed';

seed = 'a';

let arc4 = ARC4(seed, {
	/**
	 * make iterator never end
	 */
	loop: true,
	/**
	 * show arc4 state and real seed
	 */
	state: true,
});

let i = 5;

for (let v of arc4)
{
	i--;
	console.log(1, v);
	if (!i)
	{
		break;
	}
}

i = 20;

while (i--)
{
	console.log(arc4rand());
}

function arc4rand()
{
	if (1 || arc4.next().value < 128)
	{
		let number =
			arc4.next().value * 0x1
			+ arc4.next().value * 0x100000000000000
			+ arc4.next().value * 0x1000000000000
			+ arc4.next().value * 0x10000000000
			+ arc4.next().value * 0x100000000
			+ arc4.next().value * 0x1000000
			+ arc4.next().value * 0x10000
			+ arc4.next().value * 0x100
		;
		let random = number / 0x10000000000000000;

		return random
	}

	let number =
		arc4.next().value * 0x1
		+ arc4.next().value * 0x100
		+ arc4.next().value * 0x10000
		+ arc4.next().value * 0x1000000
		+ arc4.next().value * 0x100000000
		+ arc4.next().value * 0x10000000000
		+ arc4.next().value * 0x1000000000000
		+ arc4.next().value * 0x100000000000000
	;
	let random = number / 18446744073709551616;

	return random
}
