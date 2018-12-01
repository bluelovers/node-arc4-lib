Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
function saveToJson(file, data) {
    if (Array.isArray(file)) {
        file = path.resolve(...file);
    }
    fs.writeFileSync(file, JSON.stringify(data));
}
exports.saveToJson = saveToJson;
Object.freeze(exports);
