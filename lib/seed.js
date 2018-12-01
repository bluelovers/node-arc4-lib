Object.defineProperty(exports, "__esModule", {
    value: !0
});

const chai_1 = require("chai"), util_1 = require("./util"), INTERNAL_SEED_MIXIN_ARRAY = require("../seed.json");

function seedFromUnsafeBuffer(e = util_1.ARC4_LENGTH, r) {
    return mixinSeed(Buffer.allocUnsafe(e || util_1.ARC4_LENGTH), r);
}

function mixinSeed(e, r, t) {
    t ? (t |= 0, t = Math.max(Math.max(t, util_1.ARC4_LENGTH), e.length)) : t = Math.max(e.length, util_1.ARC4_LENGTH);
    let a = _arrayPadEntries(e, t), i = a.length;
    !0 === r ? r = util_1.createArray(util_1.ARC4_LENGTH, (e, r) => 0) : r ? (chai_1.expect(r).to.have.lengthOf.gt(0), 
    Array.from(r).forEach(e => chai_1.expect(e).gte(0))) : r = INTERNAL_SEED_MIXIN_ARRAY;
    let f = r.length;
    for (;i--; ) a[i] = (a[i] + r[i % f] | 0) % util_1.ARC4_LENGTH;
    return a;
}

function handleSeed(e, r, t) {
    let a = typeof e, i = Array.isArray(e);
    if (Buffer.isBuffer(e)) ; else if ("undefined" === a || null === e || "" === e) e = seedFromUnsafeBuffer(); else if ("number" === a || "bigint" === a) e = (0 | e) === e && e < 256 ? [ e ] : Array.from(Buffer.from(util_1._numHex(e), "hex")); else if ("string" === a) e = Array.from(e).map(e => e.charCodeAt(0)); else if (i || t < 1 && e[Symbol.iterator]) Array.isArray(e) || (e = util_1.arrayFromIterator(e)), 
    e = Array.from(e).reduce(function(e, r) {
        let a = typeof r;
        return "bigint" !== a && "number" !== a || r !== (0 | r) ? (r = Array.from(handleSeed(r, void 0, 1 + (0 | t))), 
        e.push(...r)) : (r = Number(r), e.push(r)), e;
    }, []); else {
        let r = (e = String(e)).length, t = [];
        for (;r--; ) t[r] = 0 | e[r].codePointAt(0);
        e = t;
    }
    return t || e.length || (e = seedFromUnsafeBuffer()), e = void 0 !== r ? mixinSeed(e, r) : _arrayPadEntries(e, e.length || util_1.ARC4_LENGTH);
}

function arrayPadEntries(e) {
    return _arrayPadEntries(e, util_1.ARC4_LENGTH);
}

function _arrayPadEntries(e, r = util_1.ARC4_LENGTH) {
    let t = e.length;
    if (t < r) if (Buffer.isBuffer(e)) {
        let t = Buffer.allocUnsafe(r);
        e.copy(t), e = t;
    } else e = e.concat(util_1.createArray(r - t, (e, r) => t + r)); else t > r && (e = e.slice(0, r));
    return e = Buffer.isBuffer(e) ? Buffer.from(e) : Array.from(e);
}

exports.seedFromUnsafeBuffer = seedFromUnsafeBuffer, exports.mixinSeed = mixinSeed, 
exports.handleSeed = handleSeed, exports.arrayPadEntries = arrayPadEntries, exports._arrayPadEntries = _arrayPadEntries, 
Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJjaGFpXzEiLCJyZXF1aXJlIiwidXRpbF8xIiwiSU5URVJOQUxfU0VFRF9NSVhJTl9BUlJBWSIsInNlZWRGcm9tVW5zYWZlQnVmZmVyIiwibGVuIiwiQVJDNF9MRU5HVEgiLCJtaXhpbkFycmF5IiwibWl4aW5TZWVkIiwiQnVmZmVyIiwiYWxsb2NVbnNhZmUiLCJzZWVkQXJyYXkiLCJ0YXJnZXRMZW5ndGgiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiYnVmIiwiX2FycmF5UGFkRW50cmllcyIsImkiLCJjcmVhdGVBcnJheSIsInYiLCJleHBlY3QiLCJ0byIsImhhdmUiLCJsZW5ndGhPZiIsImd0IiwiQXJyYXkiLCJmcm9tIiwiZm9yRWFjaCIsImd0ZSIsIm1peGluQXJyYXlMZW5ndGgiLCJoYW5kbGVTZWVkIiwiaW5wdXQiLCJkZWVwIiwidGkiLCJpc19hcnJheSIsImlzQXJyYXkiLCJpc0J1ZmZlciIsIl9udW1IZXgiLCJtYXAiLCJjaGFyQ29kZUF0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJhcnJheUZyb21JdGVyYXRvciIsInJlZHVjZSIsImEiLCJ0diIsInVuZGVmaW5lZCIsInB1c2giLCJOdW1iZXIiLCJTdHJpbmciLCJhcnIiLCJjb2RlUG9pbnRBdCIsImFycmF5UGFkRW50cmllcyIsImJ1ZjIiLCJjb3B5IiwiY29uY2F0Iiwic2xpY2UiLCJmcmVlemUiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsU0FBU0MsUUFBUSxTQUNqQkMsU0FBU0QsUUFBUSxXQUNqQkUsNEJBQTRCRixRQUFROztBQUMxQyxTQUFTRyxxQkFBcUJDLElBQU1ILE9BQU9JLGFBQWFDO0lBQ3BELE9BQU9DLFVBQVVDLE9BQU9DLFlBQVlMLEtBQU9ILE9BQU9JLGNBQWNDOzs7QUFNcEUsU0FBU0MsVUFBVUcsR0FB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