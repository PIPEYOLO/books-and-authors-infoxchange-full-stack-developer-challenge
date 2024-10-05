import { Axios, AxiosError, AxiosResponse } from "axios";

const axios = new Axios({
  baseURL: "/api",
  transformRequest: [function (data) {
    return JSON.stringify(data);
  }],
  transformResponse: [function (data) {
    return JSON.parse(data);
  }]
})


type AxiosTimeOutError = { status: 408, data: { status: 408, error: { message: string } } };

// async function fetchServer(url: string, method: "GET" | "POST" | "PUT" = "GET", options?: { data: {}, headers?: {} }): Promise<AxiosResponse | AxiosTimeOutError> {

//   let result: AxiosResponse | AxiosTimeOutError;
//   try {
//     result = await axios.request({
//       method,
//       url,
//       data: options?.data,
//       headers: options?.headers,
//     })
//   }
//   catch(error_) {
//     console.log(error_);
//     const error = error_ as AxiosError ;
//     if(error.code === 'ECONNABORTED') {
//       result = {
//         status: 408, // Código de estado para timeout
//         data: {
//           status: 408,
//           error: {
//             message: 'Request timed out. Please try again later.'
//           }
//         }
//       };
//     }
//     else result = error.response as AxiosResponse;
//   }

//   return result;

// }


export function getBooks() {
  return axios.get("/books")
  // return fetchServer("/books")
}

export function getBook(_id: string) {
  return axios.get(`/book/${_id}`)
  // return fetchServer(`/book/${_id}`)
}

export function createBook(data: BookCreationPayload) {
  return axios.post("/book", data)
  // return fetchServer("/book", "POST", { data })
}

export function getAuthors(){
  return axios.get("/authors")
  // return fetchServer(`/authors`)
}

export function getAuthor(_id: string) {
  return axios.get(`/author/${_id}`)
  // return fetchServer(`/authors/${_id}`)
}

export function createAuthor(data: AuthorCreationPayload) {
  return axios.post("/author", data);
  // return fetchServer("/author", "POST", { data })
}
