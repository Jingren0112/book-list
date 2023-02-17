import { render } from '@testing-library/react';
import { MainPage } from './mainPage';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

// Mock router
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('MainPage it', () => {
    it('renders correctly ', () => {
        // arrange

        // act
        const tree = render(<Provider store={ store }><MainPage /></Provider>)
        // assert
        expect(tree).toMatchSnapshot();
    })
})