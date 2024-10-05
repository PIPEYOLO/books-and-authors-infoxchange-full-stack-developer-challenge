"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.Author = void 0;
var mongoose_1 = require("mongoose");
var config_js_1 = require("./config.js");
var author_js_1 = require("./schemas/author.js");
var book_js_1 = require("./schemas/book.js");
exports.Author = (0, mongoose_1.model)(config_js_1.AUTHOR_MODEL_COLLECTION_NAME, author_js_1.default, config_js_1.AUTHOR_MODEL_COLLECTION_NAME);
exports.Book = (0, mongoose_1.model)(config_js_1.BOOK_MODEL_COLLECTION_NAME, book_js_1.default, config_js_1.BOOK_MODEL_COLLECTION_NAME);
