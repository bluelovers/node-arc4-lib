Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ARC4_LENGTH = 256;

const _HEX_D = ".".codePointAt(0).toString();

function _numHex(e) {
    let t = Number(e).toString(16).replace(".", _HEX_D);
    return t = t.padStart(t.length + t.length % 2, "0");
}

function arrayFromIterator(e, t = exports.ARC4_LENGTH) {
    let r = e[Symbol.iterator](), o = [];
    for (e.length && (t = 0 | Math.min(t, 0 | e.length)); t--; ) {
        let e = r.next();
        if (void 0 !== e.value && o.push(e.value), e.done) break;
    }
    return o;
}

function createArray(e = exports.ARC4_LENGTH, t) {
    return Array.from({
        length: e
    }, t);
}

function handleOptions(e) {
    return "boolean" == typeof e && (e = {
        loop: !!e
    }), e || {};
}

function isOptions(e) {
    if ("object" == typeof e && ("mixinArray" in e || "seedArray" in e || "loop" in e || "state" in e)) return !0;
}

exports._numHex = _numHex, exports.arrayFromIterator = arrayFromIterator, exports.createArray = createArray, 
exports.handleOptions = handleOptions, exports.isOptions = isOptions, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJBUkM0X0xFTkdUSCIsIl9IRVhfRCIsImNvZGVQb2ludEF0IiwidG9TdHJpbmciLCJfbnVtSGV4IiwiaW5wdXQiLCJoZXgiLCJOdW1iZXIiLCJyZXBsYWNlIiwicGFkU3RhcnQiLCJsZW5ndGgiLCJhcnJheUZyb21JdGVyYXRvciIsImFyciIsImxpbWl0IiwiaXQiLCJTeW1ib2wiLCJpdGVyYXRvciIsInJldCIsIk1hdGgiLCJtaW4iLCJyIiwibmV4dCIsInB1c2giLCJkb25lIiwiY3JlYXRlQXJyYXkiLCJtYXBGbiIsIkFycmF5IiwiZnJvbSIsImhhbmRsZU9wdGlvbnMiLCJvcHRzIiwibG9vcCIsImlzT3B0aW9ucyIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87SUFDdERELFFBQVFFLGNBQWM7O0FBRXRCLE1BQU1DLFNBQVMsSUFBSUMsWUFBWSxHQUFHQzs7QUFDbEMsU0FBU0MsUUFBUUM7SUFDYixJQUFJQyxJQUFNQyxPQUFPRixHQUFPRixTQUFTLElBQUlLLFFBQVEsS0FBS1A7SUFFbEQsT0FEQUssSUFBTUEsRUFBSUcsU0FBU0gsRUFBSUksU0FBVUosRUFBSUksU0FBUyxHQUFJOzs7QUFPdEQsU0FBU0Msa0JBQWtCQyxHQUFLQyxJQUFRZixRQUFRRTtJQUM1QyxJQUFJYyxJQUFLRixFQUFJRyxPQUFPQyxhQUNoQkM7SUFNSixLQUpJTCxFQUFJRixXQUVKRyxJQUEwQyxJQUFsQ0ssS0FBS0MsSUFBSU4sR0FBb0IsSUFBYkQsRUFBSUYsVUFFekJHLE9BQVM7UUFDWixJQUFJTyxJQUFJTixFQUFHTztRQUlYLFNBSHVCLE1BQVpELEVBQUVyQixTQUNUa0IsRUFBSUssS0FBS0YsRUFBRXJCLFFBRVhxQixFQUFFRyxNQUNGOztJQUdSLE9BQU9OOzs7QUFHWCxTQUFTTyxZQUFZZCxJQUFTWixRQUFRRSxhQUFheUI7SUFDL0MsT0FBT0MsTUFBTUM7UUFDVGpCLFFBQUFBO09BQ0RlOzs7QUFHUCxTQUFTRyxjQUFjQztJQU1uQixPQUxvQixvQkFBVEEsTUFDUEE7UUFDSUMsUUFBUUQ7UUFHVEE7OztBQUdYLFNBQVNFLFVBQVVGO0lBQ2YsSUFBb0IsbUJBQVRBLE1BQ0gsZ0JBQWdCQSxLQUFRLGVBQWVBLEtBQVEsVUFBVUEsS0FBUSxXQUFXQSxJQUM1RSxRQUFPOzs7QUExQ25CL0IsUUFBUU0sVUFBVUEsU0F1QmxCTixRQUFRYSxvQkFBb0JBLG1CQU01QmIsUUFBUTBCLGNBQWNBO0FBU3RCMUIsUUFBUThCLGdCQUFnQkEsZUFReEI5QixRQUFRaUMsWUFBWUEsV0FDcEJuQyxPQUFPb0MsT0FBT2xDIn0=