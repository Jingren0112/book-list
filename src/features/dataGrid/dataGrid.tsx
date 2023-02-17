import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { bookListColumns } from './types'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectData, setCurrentPage } from '../bookList/bookListSlice';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loadingStatus } from '../../app/types';
import { isNil } from 'lodash';
import { setPageItem } from '../bookList/bookListSlice';

export const BookListDataGrid = () => {
    const data = useAppSelector(selectData)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Box
            sx={
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
            <div>
                <h1>GG Test: Book List</h1>
                <button onClick={ () => {
                    navigate('/bookList?page=1')
                } }> Click here for list access!</button>
            </div>

            <div style={ { height: 400, width: '100%' } }>
                { data.status === loadingStatus.success && !isNil(data.data) ?
                    <DataGrid columns={ bookListColumns }
                        rows={ data.data! }
                        components={ { Toolbar: GridToolbar } }
                        pageSize={ data.itemsPerPage }
                        initialState={ {
                            pagination: {
                                page: data.currentPage,
                                pageSize: data.itemsPerPage
                            }
                        } }
                        onPageSizeChange={ (newPageSize) => {
                            dispatch(setPageItem(newPageSize))
                        } }
                        onPageChange={ (newPage) => {
                            dispatch(setCurrentPage(newPage))
                        } }
                        pagination={ true }
                        rowsPerPageOptions={ [5, 10, 20] }
                    />
                    : <p>loading...</p> }
            </div>
        </Box>
    );
}