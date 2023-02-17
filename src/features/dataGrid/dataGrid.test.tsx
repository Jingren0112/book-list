import { BookListDataGrid } from './dataGrid';
import { render } from '@testing-library/react';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

// Mock router
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('BookListDataGrid it', () => {
    it('renders correctly ', () => {
        // arrange

        // act
        const tree = render(<Provider store={ store }><BookListDataGrid /></Provider>)
        // assert
        expect(tree).toMatchSnapshot();
    })
})