import axio from 'axios'
import { booksEndPoint, url } from './type'

export const fetchBook = () => axio.post(url + booksEndPoint)
