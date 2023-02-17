import { useAppSelector } from '../../app/hooks';
import {
    selectData,
} from './bookListSlice';
import { isNil } from 'lodash';
import { BookListItem } from '../bookListItem/bookListItem';
import { Box, Divider, List, Pagination, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

interface IBookListProps {
    currentPage?: number;
}

export const BookList = (props: IBookListProps): JSX.Element => {
    const state = useAppSelector(selectData);
    const navigate = useNavigate();
    // get current page from url
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    // if current page is provided, it will be used instead of the one from url
    const currentPage = props.currentPage ?? page;

    // get data length for current page
    const start = (currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    const currentData = !isNil(state.data) ? state.data?.slice(start, end) : null;
    return (
        <Box sx={
            {
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '80%',
                margin: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }
        }>
            <Typography component="div" sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                }
            }>
                <h1>GG Test: Book List</h1>

                <button onClick={ () => {
                    navigate('/dataGrid')
                } }> Click here for data grid access!</button>
                <List sx={ { width: '100%', bgcolor: 'background.paper' } }>
                    <Divider component="li" />
                    { !isNil(currentData) ? currentData.map((book, index) => {
                        return (
                            <BookListItem book={ book } key={ index } />
                        )
                    }) : <></> }
                </List >
            </Typography>
            <Pagination
                page={ page }
                count={ !isNil(state.data) ? state.data?.length / state.itemsPerPage! : 0 }
                onChange={ (event, value) => {
                    window.location.href = `/bookList?page=${value}`;
                } }
            />
        </Box>);
}

