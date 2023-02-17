import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../../util/test-util'
import { BookList } from './bookList'
import { booksEndPoint, url } from '../api/type'
import reducer, { IBookListState, initialState, setCurrentPage, setPageItem } from './bookListSlice'
import { store } from '../../app/store'

// We use msw to intercept the network request during the test,
// and return the response 'test' after 150ms
// when receiving a get request to the `http://nyx.vima.ekt.gr:3000/api/book` endpoint
export const handlers = [
  rest.get(url + booksEndPoint, (req, res, ctx) => {
    return res(ctx.json('test'), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('should handle currentPage changes', () => {
  const previousState: IBookListState = { ...initialState, currentPage: 1 }

  expect(reducer(previousState, setCurrentPage(2))).toEqual(
    { ...initialState, currentPage: 2 }
  )
})

test('should handle page item number changes', () => {
  const previousState: IBookListState = { ...initialState, itemsPerPage: 5 }

  expect(reducer(previousState, setPageItem(10))).toEqual(
    { ...initialState, itemsPerPage: 10 }
  )
})