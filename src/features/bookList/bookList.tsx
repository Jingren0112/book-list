import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    fetchBooksAsync, selectData,
} from './bookListSlice';
import styles from './Counter.module.css';
import { isNil } from 'lodash';
import { IBook } from '../../app/types';
import { BookListItem } from '../bookListItem/bookListItem';
import { Pagination, PaginationItem } from '@mui/material';
import { Link, redirect, useLocation } from 'react-router-dom';
import { setCurrentPage } from './bookListSlice';

interface IBookListProps {
    currentPage?: number;
}

export const BookList = (props: IBookListProps): JSX.Element => {
    const state = useAppSelector(selectData);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    console.log('page', page)
    const currentPage = props.currentPage ?? page;
    console.log('currentPage', currentPage)
    const start = (currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    const currentData = !isNil(state.data) ? state.data?.slice(start, end) : null;
    console.log('start', start, 'end', end, 'currentData', currentData)
    const dispatch = useAppDispatch();
    return (
        <>
            <div>
                <h1>this is the home page</h1>
                <p>current page is </p>{ page }
                <div>
                    { !isNil(currentData) ? currentData.map((book, index) => {
                        return (
                            <div key={ index }>
                                <BookListItem book={ book } />
                            </div>
                        )
                    }) : <></> }
                </div >
            </div>
            <Pagination
                page={ page }
                count={ !isNil(state.data) ? state.data?.length / state.itemsPerPage! : 0 }
                renderItem={ (item) => (
                    <PaginationItem
                        component={ Link }
                        to={ `${item.page === 0 ? '' : `/bookList?page=${item.page}`}` }
                        { ...item }
                    />
                ) }
                onChange={ (e, newPage) => {
                    redirect(`/bookList?page='${newPage}'`)
                    dispatch(setCurrentPage(newPage))
                } }
            />
        </>);
}

