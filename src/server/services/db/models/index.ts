import { model } from 'mongoose'
import { AUTHOR_MODEL_COLLECTION_NAME, BOOK_MODEL_COLLECTION_NAME } from './config.js'
import AuthorSchema from './schemas/author.js'
import BookSchema from './schemas/book.js'

export const Author = model(AUTHOR_MODEL_COLLECTION_NAME, AuthorSchema, AUTHOR_MODEL_COLLECTION_NAME)
export const Book = model(BOOK_MODEL_COLLECTION_NAME, BookSchema, BOOK_MODEL_COLLECTION_NAME)
