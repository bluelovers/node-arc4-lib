import { ITSArrayLikeWriteable } from 'ts-type';
import { IARC4Data, IHandleSeedInput, IMixinArrayArgv, ISeedArray } from './index';
import { _numHex, ARC4_LENGTH, arrayFromIterator, createArray } from './util';
import INTERNAL_SEED_MIXIN_ARRAY = require('../seed.json');

export function seedFromUnsafeBuffer(len: number = ARC4_LENGTH, mixinArray?: IMixinArrayArgv): IARC4Data<Buffer>
{
	return mixinSeed(Buffer.allocUnsafe(len || ARC4_LENGTH), mixinArray);
}

/**
 * mixin seedArray with mixinArray
 */
export function mixinSeed<T extends ISeedArray>(seedArray: T, mixinArray?: IMixinArrayArgv): IARC4Data<T>
{
	let buf = arrayPadEntries(seedArray);
	let i = buf.length;

	if (mixinArray === true)
	{
		mixinArray = createArray(ARC4_LENGTH, (v, i) => i)
	}
	else if (!mixinArray)
	{
		mixinArray = INTERNAL_SEED_MIXIN_ARRAY;
	}

	let mixinArrayLength = mixinArray.length;

	while (i--)
	{
		buf[i] = ((buf[i] + mixinArray[i % mixinArrayLength]) | 0) % ARC4_LENGTH;
	}

	return buf;
}

export function handleSeed<T extends ISeedArray | any | string | any[]>(input: T,
	mixinArray?: IMixinArrayArgv, deep?: number,
): IHandleSeedInput<T>
{
	let ti = typeof input;
	let is_array = Array.isArray(input);

	if (Buffer.isBuffer(input))
	{

	}
	// @ts-ignore
	else if (ti === 'undefined' || input === null || input === '')
	{
		// @ts-ignore
		input = seedFromUnsafeBuffer();
	}
	else if (ti === 'number' || ti === 'bigint')
	{
		// @ts-ignore
		if (((input | 0) === input) && input < 256)
		{
			// @ts-ignore
			input = [input]
		}
		else
		{
			// @ts-ignore
			input = Array.from(Buffer.from(_numHex(input), 'hex'))
		}
	}
	else if (ti === 'string')
	{
		// @ts-ignore
		input = Array.from(Buffer.from(input));
	}
	else if (is_array || (deep < 1 && input[Symbol.iterator]))
	{
		if (!Array.isArray(input))
		{
			// @ts-ignore
			input = arrayFromIterator(input)
		}

		// @ts-ignore
		input = Array.from(input)
			.reduce(function (a, v)
			{
				let tv = typeof v;

				// @ts-ignore
				if ((tv === 'bigint' || tv === 'number') && v === (v | 0))
				{
					v = Number(v);

					// @ts-ignore
					a.push(v)
				}
				else
				{
					//console.log(v);

					v = Array.from(handleSeed(v, undefined, (deep | 0) + 1));
					// @ts-ignore
					a.push(...v);
				}

				return a;
			}, [])
		;
	}
	else
	{
		// @ts-ignore
		input = String(input);
		let i = input.length;

		let arr = [];

		while (i--)
		{
			arr[i] = (input[i] as string).codePointAt(0) | 0;
		}

		// @ts-ignore
		input = arr;
	}

	if (!deep && !input.length)
	{
		// @ts-ignore
		input = seedFromUnsafeBuffer();
	}

	if (typeof mixinArray !== 'undefined')
	{
		// @ts-ignore
		input = mixinSeed(input, mixinArray)
	}
	else
	{
		// @ts-ignore
		input = _arrayPadEntries(input, input.length || ARC4_LENGTH);
	}

	// @ts-ignore
	return input
}

/**
 * clone current input and fill to fixed length (ARC4_LENGTH = 256)
 */
export function arrayPadEntries<T extends ITSArrayLikeWriteable<number> | Buffer>(buf: T): IARC4Data<T>
{
	// @ts-ignore
	return _arrayPadEntries(buf, ARC4_LENGTH)
}

export function _arrayPadEntries<T extends ITSArrayLikeWriteable<number> | Buffer>(buf: T,
	targetLength: number = ARC4_LENGTH,
): T
{
	let len = buf.length;

	if (len < targetLength)
	{
		if (Buffer.isBuffer(buf))
		{
			let buf2 = Buffer.allocUnsafe(targetLength);
			buf.copy(buf2);
			// @ts-ignore
			buf = buf2;
		}
		else
		{
			// @ts-ignore
			buf = buf.concat(createArray(targetLength - len, (v, i) => len + i));
		}
	}
	else if (len > targetLength)
	{
		// @ts-ignore
		buf = buf.slice(0, targetLength)
	}

	if (Buffer.isBuffer(buf))
	{
		// @ts-ignore
		buf = Buffer.from(buf)
	}
	else
	{
		// @ts-ignore
		buf = Array.from(buf);
	}

	// @ts-ignore
	return buf;
}

Object.freeze(exports)
