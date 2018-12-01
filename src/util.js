Object.defineProperty(exports, "__esModule", { value: true });
exports.ARC4_LENGTH = 0x100;
//const hasOwnProperty = Object.prototype.hasOwnProperty;
const _HEX_D = '.'.codePointAt(0).toString();
function _numHex(input) {
    let hex = Number(input).toString(16).replace('.', _HEX_D);
    hex = hex.padStart(hex.length + (hex.length % 2), '0');
    return hex;
}
exports._numHex = _numHex;
/**
 * avoid if iterator is never done
 */
function arrayFromIterator(arr, limit = exports.ARC4_LENGTH) {
    let it = arr[Symbol.iterator]();
    let ret = [];
    // @ts-ignore
    if (arr.length) {
        // @ts-ignore
        limit = Math.min(limit, arr.length | 0) | 0;
    }
    while (limit--) {
        let r = it.next();
        if (typeof r.value !== 'undefined') {
            ret.push(r.value);
        }
        if (r.done) {
            break;
        }
    }
    return ret;
}
exports.arrayFromIterator = arrayFromIterator;
function createArray(length = exports.ARC4_LENGTH, mapFn) {
    return Array.from({
        length,
    }, mapFn);
}
exports.createArray = createArray;
function handleOptions(opts) {
    if (typeof opts === 'boolean') {
        opts = {
            loop: !!opts,
        };
    }
    return opts || {};
}
exports.handleOptions = handleOptions;
function isOptions(opts) {
    if (typeof opts === 'object') {
        if ('mixinArray' in opts || 'seedArray' in opts || 'loop' in opts || 'state' in opts) {
            return true;
        }
    }
}
exports.isOptions = isOptions;
Object.freeze(exports);
