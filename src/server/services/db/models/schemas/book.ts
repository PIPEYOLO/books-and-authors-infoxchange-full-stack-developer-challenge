import { Schema } from 'mongoose'
import { isValidISBN, validateBookName } from '../../../../../utils/validators.js'
import { AUTHOR_MODEL_COLLECTION_NAME } from '../config.js'
import { Author } from '../index.js'
const BookSchema = new Schema({
  name: {
    type: String,
    validate: validateBookName,
    required: [true, 'name is required']
  },
  isbn: {
    type: String,
    validate: function (v: string) {
      if (!isValidISBN(v)) throw 'Unvalid ISBN'
    },
    required: [true, 'isbn is required']
  },
  author_id: {
    type: Schema.Types.ObjectId,
    validate: {
      validator: async function (v: any) {
        try {
          await Author.getAuthor(v)
        } catch (error) {
          throw (error as KnownErrorType).message as KnownErrorType['message']
        }
      }
    },
    required: [true, 'author_id is required'],
    immutable: [true, 'author_id is immutable']
  }
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  virtuals: {
    author: {
      type: Schema.Types.Subdocument,
      options: {
        ref: AUTHOR_MODEL_COLLECTION_NAME,
        foreignField: '_id',
        localField: 'author_id',
        justOne: true
      }
    }
  }
}
)

export default BookSchema
