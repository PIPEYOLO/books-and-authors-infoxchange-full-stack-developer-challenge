import { Schema } from "mongoose";
import AuthorSchema from "./author.js";
import { AUTHOR_MODEL_COLLECTION_NAME } from "../config.js";


const BookSchema = new Schema({
  name: {
    type: String,
    required: [ true, "name is required" ]
  },
  isbn: {
    type: String,
    required: [ true, "isbn is required" ]
  },
  author_id: {
    type: Schema.Types.ObjectId,
    required: [ true, "author_id is required" ]
  }
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  virtuals: {
    author: {
      type: AuthorSchema,
      options: {
        ref: AUTHOR_MODEL_COLLECTION_NAME,
        foreignField: "_id",
        localField: "author_id",
        justOne: true
      }
    }
  }
}
)


export default BookSchema;