Object.defineProperty(exports, "__esModule", {
    value: !0
});

const chai_1 = require("chai"), seed_1 = require("./seed"), util_1 = require("./util"), ARC4_LENGTH = 256;

function ARC4(e, t, r) {
    e && util_1.isOptions(e) ? (r = util_1.handleOptions(e), e = r.seedArray, t = r.mixinArray || t) : util_1.isOptions(t) && (r = util_1.handleOptions(t), 
    e = r.seedArray || e, t = r.mixinArray), r = util_1.handleOptions(r), void 0 === t && (t = null);
    const n = seed_1.handleSeed(e, t), i = arc4mixin(n), a = arc4Generator(i, r.loop);
    return r.state ? {
        get seed() {
            return e;
        },
        get _seed() {
            return n;
        },
        get state() {
            return i;
        },
        next: a.next.bind(a)
    } : {
        get seed() {
            return e;
        },
        next: a.next.bind(a)
    };
}

function arc4mixin(e) {
    let t = seed_1.arrayPadEntries(e), r = ARC4_LENGTH;
    for (;r--; ) t[r] = r;
    r = ARC4_LENGTH;
    let n = e.length, i = 0, a = 0;
    for (;r--; ) {
        a = (a + t[i] + e[i % n]) % ARC4_LENGTH;
        let r = t[i];
        t[i] = t[a], t[a] = r, i++;
    }
    return t;
}

function* arc4Generator(e, t) {
    let r, n;
    chai_1.expect(e).lengthOf.gt(0);
    let i = 0, a = 0, l = e.length;
    if (t) for (;;) a = (a + e[i = (i + 1) % l]) % l, n = e[i], e[i] = e[a], e[a] = n, 
    yield e[r = (e[i] + e[a]) % l]; else {
        let t = l;
        for (;t--; ) a = (a + e[i = (i + 1) % l]) % l, n = e[i], e[i] = e[a], e[a] = n, 
        yield e[r = (e[i] + e[a]) % l];
    }
}

exports.default = ARC4, exports.ARC4 = ARC4, exports.arc4mixin = arc4mixin, exports.arc4Generator = arc4Generator, 
Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJjaGFpXzEiLCJyZXF1aXJlIiwic2VlZF8xIiwidXRpbF8xIiwiQVJDNF9MRU5HVEgiLCJBUkM0Iiwic2VlZEFycmF5IiwibWl4aW5BcnJheSIsIm9wdHMiLCJpc09wdGlvbnMiLCJoYW5kbGVPcHRpb25zIiwic2VlZCIsImhhbmRsZVNlZWQiLCJzZWVkbWl4aW4iLCJhcmM0bWl4aW4iLCJpdGVyYXRvciIsImFyYzRHZW5lcmF0b3IiLCJsb29wIiwic3RhdGUiLCJfc2VlZCIsIm5leHQiLCJiaW5kIiwiYnVmIiwiYXJyYXlQYWRFbnRyaWVzIiwibGltaXQiLCJzZWVkTGVuZ3RoIiwibGVuZ3RoIiwiaSIsImoiLCJzd2FwIiwiaW5kZXgiLCJleHBlY3QiLCJsZW5ndGhPZiIsImd0IiwibGVuIiwiZGVmYXVsdCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBR0FBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxTQUFTQyxRQUFRLFNBQ2pCQyxTQUFTRCxRQUFRLFdBQ2pCRSxTQUFTRixRQUFRLFdBQ2pCRyxjQUFjOztBQUVwQixTQUFTQyxLQUFLQyxHQUFXQyxHQUFZQztJQUU3QkYsS0FBYUgsT0FBT00sVUFBVUgsTUFFOUJFLElBQU9MLE9BQU9PLGNBQWNKLElBRTVCQSxJQUFZRSxFQUFLRixXQUNqQkMsSUFBYUMsRUFBS0QsY0FBY0EsS0FFM0JKLE9BQU9NLFVBQVVGLE9BQ3RCQyxJQUFPTCxPQUFPTyxjQUFjSDtJQUU1QkQsSUFBWUUsRUFBS0YsYUFBYUEsR0FDOUJDLElBQWFDLEVBQUtELGFBRXRCQyxJQUFPTCxPQUFPTyxjQUFjRixTQUNGLE1BQWZELE1BQ1BBLElBQWE7SUFHakIsTUFBTUksSUFBT1QsT0FBT1UsV0FBV04sR0FBV0MsSUFDcENNLElBQVlDLFVBQVVILElBRXRCSSxJQUFXQyxjQUFjSCxHQUFXTCxFQUFLUztJQUUvQyxPQUFJVCxFQUFLVTtRQUVEUDtZQUVJLE9BQU9MOztRQUVYYTtZQUNJLE9BQU9SOztRQUVYTztZQUNJLE9BQU9MOztRQUVYTyxNQUFNTCxFQUFTSyxLQUFLQyxLQUFLTjs7UUFJN0JKO1lBRUksT0FBT0w7O1FBRVhjLE1BQU1MLEVBQVNLLEtBQUtDLEtBQUtOOzs7O0FBSWpDLFNBQVNELFVBQVVSO0lBQ2YsSUFBSWdCLElBQU1wQixPQUFPcUIsZ0JBQWdCakIsSUFDN0JrQixJQUFRcEI7SUFFWixNQUFPb0IsT0FFSEYsRUFBSUUsS0FBU0E7SUFFakJBLElBQVFwQjtJQUdSLElBQUlxQixJQUFhbkIsRUFBVW9CLFFBQ3ZCQyxJQUFJLEdBQ0pDLElBQUk7SUFDUixNQUFPSixPQUFTO1FBQ1pJLEtBQUtBLElBQUlOLEVBQUlLLEtBQUtyQixFQUFVcUIsSUFBSUYsTUFBZXJCO1FBQy9DLElBQUl5QixJQUFPUCxFQUFJSztRQUNmTCxFQUFJSyxLQUFLTCxFQUFJTSxJQUNiTixFQUFJTSxLQUFLQyxHQUNURjs7SUFFSixPQUFPTDs7O0FBR1gsVUFBVU4sY0FBY00sR0FBS0w7SUFFekIsSUFBSWEsR0FBT0Q7SUFEWDdCLE9BQU8rQixPQUFPVCxHQUFLVSxTQUFTQyxHQUFHO0lBRS9CLElBQUlOLElBQUksR0FDSkMsSUFBSSxHQUNKTSxJQUFNWixFQUFJSTtJQUNkLElBQUlULEdBQ0EsU0FFSVcsS0FBS0EsSUFBSU4sRUFEVEssS0FBS0EsSUFBSSxLQUFLTyxNQUNLQSxHQUNuQkwsSUFBT1AsRUFBSUssSUFDWEwsRUFBSUssS0FBS0wsRUFBSU0sSUFDYk4sRUFBSU0sS0FBS0M7VUFFSFAsRUFETlEsS0FBU1IsRUFBSUssS0FBS0wsRUFBSU0sTUFBTU0sU0FJL0I7UUFDRCxJQUFJVixJQUFRVTtRQUNaLE1BQU9WLE9BRUhJLEtBQUtBLElBQUlOLEVBRFRLLEtBQUtBLElBQUksS0FBS08sTUFDS0EsR0FDbkJMLElBQU9QLEVBQUlLLElBQ1hMLEVBQUlLLEtBQUtMLEVBQUlNLElBQ2JOLEVBQUlNLEtBQUtDO2NBRUhQLEVBRE5RLEtBQVNSLEVBQUlLLEtBQUtMLEVBQUlNLE1BQU1NOzs7O0FBbkd4Q3BDLFFBQVFxQyxVQUFVOUIsTUFpRGxCUCxRQUFRTyxPQUFPQSxNQXdCZlAsUUFBUWdCLFlBQVlBLFdBK0JwQmhCLFFBQVFrQixnQkFBZ0JBO0FBQ3hCcEIsT0FBT3dDLE9BQU90QyJ9