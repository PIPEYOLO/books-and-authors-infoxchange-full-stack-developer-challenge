import { Axios } from "axios";

const axios = new Axios({
  baseURL: "/api",
  transformRequest: [function (data) {
    return JSON.stringify(data);
  }],
  transformResponse: [function (data) {
    return JSON.parse(data);
  }],
  responseType: "json",
  headers: { "Content-Type": "application/json" },
  validateStatus: status => status < 300
})



export function getBooks() {
  return axios.get("/books")
}

export function getBook(_id: string) {
  return axios.get(`/book/${_id}`)
}

export function createBook(data: BookCreationPayload) {
  return axios.post("/book", data)
}

export function editBook(_id: Book["_id"], data: BookEditionPayload) {
  return axios.put(`/book/${_id}`, data)
}

export function getAuthors(){
  return axios.get("/authors")
}

export function getAuthor(_id: string) {
  return axios.get(`/author/${_id}`)
}

export function createAuthor(data: AuthorCreationPayload) {
  return axios.post("/author", data)
}

export function editAuthor(_id: Author["_id"], data: AuthorEditionPayload) {
  return axios.put(`/author/${_id}`, data)
}
