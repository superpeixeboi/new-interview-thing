import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:3000" 
})

api.interceptors.response.use(
  response => response.data,
  null,
  { runWhen: config => config.method === 'get' }
)

export default api
