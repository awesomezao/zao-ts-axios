import axios from 'axios'
import qs from 'qs'



process.env.BASE_URL = 'http://localhost:3001/api';
const baseUrl:string=process.env.BASE_URL

axios.defaults.baseURL = baseUrl
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.timeout = 50000




