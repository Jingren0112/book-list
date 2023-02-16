import React from 'react';
import { isNil } from 'lodash';
import { IBook } from '../../app/types';

interface IBookListItemProps {
    book: IBook | null;
}

export class BookListItem extends React.Component<IBookListItemProps> {
    constructor (props: IBookListItemProps) {
        super(props)
    }
    render() {
        const book = this.props.book;
        return (
            <>{ !isNil(book) ?
                < div >
                    <h1>{ book.book_title }</h1>
                    <h2>{ book.book_author }</h2>
                    <p>{ book.id }</p>
                    <p>{ book.book_pages }</p>
                    <p>{ book.book_publication_city }</p>
                    <p>{ book.book_publication_country }</p>
                    <p>{ book.book_publication_year }</p>
                </div > :
                <></>
            }</>
        )
    }
}
