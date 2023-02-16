import axios from 'axios'
import { booksEndPoint, param, url } from './type'

export const fetchBook = () => axios.post(url + booksEndPoint + param)
