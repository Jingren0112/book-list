import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { booksEndPoint, url } from '../api/type'
import reducer, { IBookListState, initialState, setCurrentPage, setPageItem } from './bookListSlice'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BookList } from './bookList'
import { store } from '../../app/store'

// use msw to intercept the network request during the test,
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


// snapshot test


// Mock router
const mockedUsedNavigate = jest.fn();
const mockedUseLocation = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockedUseLocation
}));

describe('bookList it', () => {
  it('should render correctly with loading state', () => {
    // arrange

    // act
    const tree = render(<Provider store={ store }><BookList /></Provider>)
    // assert
    expect(tree).toMatchSnapshot()
  }),
    it('shoud render correctly with specific page', () => {
      // arrange

      // act
      const tree = render(<Provider store={ store }><BookList currentPage={ 2 } /></Provider>)
      // assert
      expect(tree).toMatchSnapshot()
    })
})
