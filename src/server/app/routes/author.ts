import e from "express";
import { Author } from "../../services/db/models/index.js";
import { AUTHOR_NOT_FOUND_ERROR, KnownError, UNKNOWN_ERROR, UNVALID_ID_ERROR } from "../../services/error/index.js";
import { isObjectIdOrHexString } from "mongoose";



const authorRouter = e.Router();

authorRouter.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  try{
    if(isObjectIdOrHexString(_id) === false) throw UNVALID_ID_ERROR;
    const doc = await Author.findById(_id);
    if(doc === null) throw AUTHOR_NOT_FOUND_ERROR;
    res.send(doc);
  }
  catch(error) {
    if(error instanceof KnownError) {
      res.status(error.status).send(error);
    }
    else {
      res.status(UNKNOWN_ERROR.status).send(UNKNOWN_ERROR);
    }
  }
});


export default authorRouter