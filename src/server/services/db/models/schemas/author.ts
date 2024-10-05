import { Schema } from "mongoose";

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: [ true, "first_name is required" ]
  },
  last_name: {
    type: String,
    required: [ true, "last_name is required" ]
  }
});



export default AuthorSchema;