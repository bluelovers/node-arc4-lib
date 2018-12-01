import { IOptions } from './index';

export const ARC4_LENGTH = 0x100;

//const hasOwnProperty = Object.prototype.hasOwnProperty;
const _HEX_D = '.'.codePointAt(0).toString();

export function _numHex(input: number | bigint)
{
	let hex = Number(input).toString(16).replace('.', _HEX_D);
	hex = hex.padStart(hex.length + (hex.length % 2), '0');

	return hex;
}

/**
 * avoid if iterator is never done
 */
export function arrayFromIterator<T extends any>(arr: IterableIterator<T>, limit: number = ARC4_LENGTH): T[]
{
	let it = arr[Symbol.iterator]();
	let ret = [];

	// @ts-ignore
	if (arr.length)
	{
		// @ts-ignore
		limit = Math.min(limit, arr.length | 0) | 0
	}

	while (limit--)
	{
		let r = it.next();

		if (typeof r.value !== 'undefined')
		{
			ret.push(r.value);
		}

		if (r.done)
		{
			break;
		}
	}

	return ret;
}

export function createArray(length = ARC4_LENGTH, mapFn?: (v: number, i: number) => number): number[]
{
	return Array.from({
		length,
	}, mapFn);
}

export function handleOptions(opts?: IOptions | boolean): IOptions
{
	if (typeof opts === 'boolean')
	{
		opts = {
			loop: !!opts,
		};
	}

	return opts || {};
}

export function isOptions(opts): opts is IOptions
{
	if (typeof opts === 'object')
	{
		if ('mixinArray' in opts || 'seedArray' in opts || 'loop' in opts || 'state' in opts)
		{
			return true;
		}
	}
}

Object.freeze(exports)
