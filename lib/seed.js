Object.defineProperty(exports, "__esModule", {
    value: !0
});

const util_1 = require("./util"), INTERNAL_SEED_MIXIN_ARRAY = require("../seed.json");

function seedFromUnsafeBuffer(e = util_1.ARC4_LENGTH, r) {
    return mixinSeed(Buffer.allocUnsafe(e || util_1.ARC4_LENGTH), r);
}

function mixinSeed(e, r) {
    let t = arrayPadEntries(e), f = t.length;
    !0 === r ? r = util_1.createArray(util_1.ARC4_LENGTH, (e, r) => r) : r || (r = INTERNAL_SEED_MIXIN_ARRAY);
    let i = r.length;
    for (;f--; ) t[f] = (t[f] + r[f % i] | 0) % util_1.ARC4_LENGTH;
    return t;
}

function handleSeed(e, r, t) {
    let f = typeof e, i = Array.isArray(e);
    if (Buffer.isBuffer(e)) ; else if ("undefined" === f || null === e || "" === e) e = seedFromUnsafeBuffer(); else if ("number" === f || "bigint" === f) e = (0 | e) === e && e < 256 ? [ e ] : Array.from(Buffer.from(util_1._numHex(e), "hex")); else if ("string" === f) e = Array.from(Buffer.from(e)); else if (i || t < 1 && e[Symbol.iterator]) Array.isArray(e) || (e = util_1.arrayFromIterator(e)), 
    e = Array.from(e).reduce(function(e, r) {
        let f = typeof r;
        return "bigint" !== f && "number" !== f || r !== (0 | r) ? (r = Array.from(handleSeed(r, void 0, 1 + (0 | t))), 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJ1dGlsXzEiLCJyZXF1aXJlIiwiSU5URVJOQUxfU0VFRF9NSVhJTl9BUlJBWSIsInNlZWRGcm9tVW5zYWZlQnVmZmVyIiwibGVuIiwiQVJDNF9MRU5HVEgiLCJtaXhpbkFycmF5IiwibWl4aW5TZWVkIiwiQnVmZmVyIiwiYWxsb2NVbnNhZmUiLCJzZWVkQXJyYXkiLCJidWYiLCJhcnJheVBhZEVudHJpZXMiLCJpIiwibGVuZ3RoIiwiY3JlYXRlQXJyYXkiLCJ2IiwibWl4aW5BcnJheUxlbmd0aCIsImhhbmRsZVNlZWQiLCJpbnB1dCIsImRlZXAiLCJ0aSIsImlzX2FycmF5IiwiQXJyYXkiLCJpc0FycmF5IiwiaXNCdWZmZXIiLCJmcm9tIiwiX251bUhleCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiYXJyYXlGcm9tSXRlcmF0b3IiLCJyZWR1Y2UiLCJhIiwidHYiLCJ1bmRlZmluZWQiLCJwdXNoIiwiTnVtYmVyIiwiU3RyaW5nIiwiYXJyIiwiY29kZVBvaW50QXQiLCJfYXJyYXlQYWRFbnRyaWVzIiwidGFyZ2V0TGVuZ3RoIiwiYnVmMiIsImNvcHkiLCJjb25jYXQiLCJzbGljZSIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxTQUFTQyxRQUFRLFdBQ2pCQyw0QkFBNEJELFFBQVE7O0FBQzFDLFNBQVNFLHFCQUFxQkMsSUFBTUosT0FBT0ssYUFBYUM7SUFDcEQsT0FBT0MsVUFBVUMsT0FBT0MsWUFBWUwsS0FBT0osT0FBT0ssY0FBY0M7OztBQU1wRSxTQUFTQyxVQUFVRyxHQUFXSjtJQUMxQixJQUFJSyxJQUFNQyxnQkFBZ0JGLElBQ3RCRyxJQUFJRixFQUFJRztLQUNPLE1BQWZSLElBQ0FBLElBQWFOLE9BQU9lLFlBQVlmLE9BQU9LLGFBQWEsQ0FBQ1csR0FBR0gsTUFBTUEs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