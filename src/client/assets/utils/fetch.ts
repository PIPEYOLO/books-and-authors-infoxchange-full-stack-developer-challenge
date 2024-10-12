import { Axios } from 'axios'

const axios = new Axios({
  baseURL: '/api',
  transformRequest: [function (data) {
    return JSON.stringify(data)
  }],
  transformResponse: [function (data) {
    return JSON.parse(data)
  }],
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
  validateStatus: status => status < 300
})

export async function getBooks () {
  return await axios.get('/books')
}

export async function getBook (_id: string) {
  return await axios.get(`/book/${_id}`)
}

export async function createBook (data: BookCreationPayload) {
  return await axios.post('/book', data)
}

export async function editBook (_id: Book['_id'], data: BookEditionPayload) {
  return await axios.put(`/book/${_id}`, data)
}

export async function getAuthor (_id: string) {
  return await axios.get(`/author/${_id}`)
}

export async function createAuthor (data: AuthorCreationPayload) {
  return await axios.post('/author', data)
}

export async function editAuthor (_id: Author['_id'], data: AuthorEditionPayload) {
  return await axios.put(`/author/${_id}`, data)
}
