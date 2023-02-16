import { Pagination } from "@mui/material";
import PaginationItem from '@mui/material/PaginationItem';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentPage, fetchBooksAsync, selectData } from "../bookList/bookListSlice";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { isNil } from "lodash";
import { BookList } from "../bookList/bookList";

export const MainPage = (): JSX.Element => {
    const navigate = useNavigate()
    const state = useAppSelector(selectData)

    return (
        <>
            <div>
                <h1>this is the home page</h1>
                { state.status === 'loading' ? <p>loading...</p> : <button onClick={ () => {
                    console.log('redirect')
                    navigate('/bookList?page=1')
                } }> access!</button> }

            </div>
        </>
    )
};