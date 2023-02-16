import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchBook } from './features/api/api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { BookList } from './features/bookList/bookList';
import { MainPage } from './features/mainPage/mainPage';
import { useSelector } from 'react-redux';
import { fetchBooksAsync, selectData } from './features/bookList/bookListSlice';
import { MemoryRouter, Routes, Route, createMemoryRouter, RouterProvider, BrowserRouter, useNavigate } from 'react-router-dom';
import { isNil } from 'lodash';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBooksAsync())
  }, [])
  const routes = [
    { path: '/', element: <MainPage /> },
  ]
  const state = useAppSelector(selectData)
  if (!isNil(state.data)) {
    for (let index = 0; index < state.data.length / state.itemsPerPage; index++) {
      index == 0 ? routes.push({ path: `/bookList`, element: <BookList /> }) :
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
      </Routes>
    </BrowserRouter>
  );
}

