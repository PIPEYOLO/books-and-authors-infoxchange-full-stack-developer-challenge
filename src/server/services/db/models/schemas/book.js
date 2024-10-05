"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var author_js_1 = require("./author.js");
var config_js_1 = require("../config.js");
var BookSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    isbn: {
        type: String,
        required: [true, "isbn is required"]
    },
    author_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "author_id is required"]
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    virtuals: {
        author: {
            type: author_js_1.default,
            options: {
                ref: config_js_1.AUTHOR_MODEL_COLLECTION_NAME,
                foreignField: "_id",
                localField: "author_id",
                justOne: true
            }
        }
    }
});
exports.default = BookSchema;
