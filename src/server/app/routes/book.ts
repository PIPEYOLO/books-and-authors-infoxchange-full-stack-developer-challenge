import e from 'express'
import { Book } from '../../services/db/models/index.js'
import { BOOK_NOT_FOUND_ERROR, KnownError, UNKNOWN_ERROR, UNVALID_ID_ERROR, UNVALID_PAYLOAD_DATA_ERROR } from '../../services/error/index.js'
import { isObjectIdOrHexString } from 'mongoose'
import { getValidationErrorInStringFormat } from '../../services/error/utils.js'

const bookRouter = e.Router()

bookRouter.get('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    if (!isObjectIdOrHexString(_id)) throw UNVALID_ID_ERROR
    const doc = await Book.findById(_id).populate('author')
    if (doc === null) throw BOOK_NOT_FOUND_ERROR
    res.send(doc)
  } catch (error) {
    if (error instanceof KnownError) {
      res.status(error.status).send(error)
    } else {
      res.status(UNKNOWN_ERROR.status).send(UNKNOWN_ERROR)
    }
  }
})

bookRouter.post('/', e.json(), async (req, res) => {
  try {
    const book = new Book({ ...req.body, _id: undefined })
    try {
      await book.validate()
    } catch (error) {
      throw UNVALID_PAYLOAD_DATA_ERROR.getWithCustomMessage(`Validation Error in fields: ${getValidationErrorInStringFormat(error as Error)}`)
    }
    const savedBook = await book.save({ validateBeforeSave: false })
    res.send(savedBook)
  } catch (error) {
    if (error instanceof KnownError) {
      res.status(error.status).send(error)
    } else {
      res.status(UNKNOWN_ERROR.status).send(UNKNOWN_ERROR)
    }
  }
})

bookRouter.put('/:_id', e.json(), async (req, res) => {
  const { _id } = req.params
  try {
    if (!isObjectIdOrHexString(_id)) throw UNVALID_ID_ERROR
    const doc = await Book.findById(_id)
    if (doc === null) throw BOOK_NOT_FOUND_ERROR
    Object.assign(doc, req.body)
    await doc.save()
    res.send(doc)
  } catch (error) {
    if (error instanceof KnownError) {
      res.status(error.status).send(error)
    } else {
      res.status(UNKNOWN_ERROR.status).send(UNKNOWN_ERROR)
    }
  }
})

export default bookRouter
