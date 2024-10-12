import { isObjectIdOrHexString, ObjectId, Schema, SchemaOptions, Document } from 'mongoose'
import { AUTHOR_NOT_FOUND_ERROR, UNVALID_ID_ERROR } from '../../../error/index.js'

import { validateAuthorName } from '../../../../../utils/validators.js'

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    validate: validateAuthorName,
    required: [true, 'first_name is required']
  },
  last_name: {
    type: String,
    validate: validateAuthorName,
    required: [true, 'last_name is required']
  }
},
{
  statics: {
    async getAuthor (_id: string | ObjectId): Promise<Document | never> {
      if (!isObjectIdOrHexString(_id)) throw UNVALID_ID_ERROR
      const doc = await this.findById(_id)
      if (doc === null) throw AUTHOR_NOT_FOUND_ERROR
      return doc
    }
  }
}

)

export default AuthorSchema
