"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var AuthorSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: [true, "first_name is required"]
    },
    last_name: {
        type: String,
        required: [true, "last_name is required"]
    }
});
exports.default = AuthorSchema;
