import React from 'react';
import { isNil } from 'lodash';
import { IBook } from '../../app/types';
import { CardContent, Divider, ListItem, ListItemText, Typography } from '@mui/material';

interface IBookListItemProps {
    book: IBook | null;
}

export class BookListItem extends React.Component<IBookListItemProps> {
    render() {
        const book = this.props.book;
        return (
            <>
                <ListItem>
                    { !isNil(book) ?
                        <ListItemText disableTypography primary={ <><h1>{ `Book No: ${book.id}` }</h1> </> } secondary={
                            <CardContent component='div' sx={ { maxWidth: "40rem" } } >
                                <h2>Title: </h2>
                                <Typography component={ 'span' } >
                                    { book.book_title }
                                </Typography>
                                <h2>Author:</h2>
                                <Typography component={ 'span' } >
                                    { book.book_author }
                                </Typography>
                                <h2>Number of page:</h2>
                                <Typography component={ 'span' } >
                                    { book.book_pages }
                                </Typography>
                                <h2>Publication City:</h2>
                                <Typography component={ 'span' } >
                                    { book.book_publication_city }
                                </Typography>
                                <h2>Publication Country:</h2>
                                <Typography component={ 'span' }>
                                    { book.book_publication_country }
                                </Typography>
                                <h2> Publiccation Year: </h2>
                                <Typography component={ 'span' }>
                                    { book.book_publication_year }
                                </Typography>
                            </CardContent>
                        }
                        /> : <></>
                    }
                </ListItem>
                <Divider component="li" />
            </>
        )
    }
}

