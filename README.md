# arc4-lib

    Iterable ARC4

## install

```
npm install arc4-lib
```

## demo

[index.d.ts](src/index.d.ts)

```ts

import { ARC4, ARC4_LENGTH, seedFromUnsafeBuffer } from 'arc4-lib';

let mixinArray: number[];
let seed: any = 'a any type seed';

//seed = '][简日双语MP4][720P]';
//seed = createArray(ARC4_LENGTH * 2, (v, i) => i * Math.random());

let arc4 = ARC4(seed, mixinArray, {
//	mixinArray: true,
	/**
	 * make iterator never end
	 */
//	loop: true,
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

i = 5;

while (i--)
{
	console.log(i, arc4.next());
}

i = 260;
i = 5;

while (i--)
{
	console.log(i, arc4rand());
}

console.log(JSON.stringify(arc4));

let t = Buffer.from('k12');
let t1 = arc4.transform(t);
/**
 * when loop is true, will not transform t1 back to t
 */
let t2 = arc4.transform(t1);

console.log(t, t1, t2);

console.log(t1.toString('hex'), t2.toString('hex'));

/**
 * fake random
 */
function arc4rand()
{
	if (0)
	{
		let number =
			arc4.next() * 0x1
			+ arc4.next() * 0x100000000
			+ arc4.next() * 0x1000000
			+ arc4.next() * 0x10000
			+ arc4.next() * 0x100
			+ arc4.next() * 0x100000000000000
			+ arc4.next() * 0x1000000000000
			+ arc4.next() * 0x10000000000
		;
		let random = number / 0x10000000000000000;

		return random
	}

	let number =
		arc4.next() * 0x1
		+ arc4.next() * 0x100
		+ arc4.next() * 0x10000
		+ arc4.next() * 0x1000000
		+ arc4.next() * 0x100000000
		+ arc4.next() * 0x10000000000
		+ arc4.next() * 0x1000000000000
		+ arc4.next() * 0x100000000000000
	;
	let random = number / 18446744073709551616;

	return random
}

```
