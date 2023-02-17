import { render } from '@testing-library/react';
import { BookListItem } from './bookListItem';
import { IBook } from '../../app/types';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

// Mock router
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('bookListItem it', () => {
    it(' renders correctly without book data', () => {
        // arrange

        // act
        const tree = render(<Provider store={ store }><BookListItem book={ null } /></Provider>)
        // assert
        expect(tree).toMatchSnapshot();
    }), it(' renders correctly with book data', () => {
        // arrange
        const mockBook: IBook = {
            id: 1,
            book_title: 'test',
            book_author: ['test'],
            book_pages: 1,
            book_publication_city: 'test',
            book_publication_country: 'test',
            book_publication_year: 1
        }
        // act
        const tree = render(<Provider store={ store }><BookListItem book={ mockBook } /></Provider>)
        // assert
        expect(tree).toMatchSnapshot();
    })
})