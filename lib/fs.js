Object.defineProperty(exports, "__esModule", {
    value: !0
});

const fs = require("fs"), path = require("path");

function saveToJson(e, r) {
    Array.isArray(e) && (e = path.resolve(...e)), fs.writeFileSync(e, JSON.stringify(r));
}

exports.saveToJson = saveToJson, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJmcyIsInJlcXVpcmUiLCJwYXRoIiwic2F2ZVRvSnNvbiIsImZpbGUiLCJkYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwicmVzb2x2ZSIsIndyaXRlRmlsZVN5bmMiLCJKU09OIiwic3RyaW5naWZ5IiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLEtBQUtDLFFBQVEsT0FDYkMsT0FBT0QsUUFBUTs7QUFDckIsU0FBU0UsV0FBV0MsR0FBTUM7SUFDbEJDLE1BQU1DLFFBQVFILE9BQ2RBLElBQU9GLEtBQUtNLFdBQVdKLEtBRTNCSixHQUFHUyxjQUFjTCxHQUFNTSxLQUFLQyxVQUFVTjs7O0FBRTFDUCxRQUFRSyxhQUFhQSxZQUNyQlAsT0FBT2dCLE9BQU9kIn0=