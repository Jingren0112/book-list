import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { BookList } from './features/bookList/bookList';
import { MainPage } from './features/mainPage/mainPage';
import { fetchBooksAsync, selectData } from './features/bookList/bookListSlice';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { isNil } from 'lodash';
import { BookListDataGrid } from './features/dataGrid/dataGrid';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBooksAsync())
    // disable warning as we want to run this only once to fetch data
    // eslint-disable-next-line 
  }, [])
  const routes = [
    { path: '/', element: <MainPage /> },
  ]
  const state = useAppSelector(selectData)

  if (!isNil(state.data)) {
    // generate routes for each page
    for (let index = 0; index < state.data.length / state.itemsPerPage; index++) {
      index === 0 ? routes.push({ path: `/bookList`, element: <BookList /> }) :
        routes.push({ path: `/bookList?page=${index + 1}`, element: <BookList /> })
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        { routes.map((route, index) => {
          return (
            <Route key={ index } path={ route.path } element={ route.element } />
          )
        })
        }
        <Route path={ '/dataGrid' } element={ <BookListDataGrid /> } />
      </Routes>
    </BrowserRouter>
  );
}

