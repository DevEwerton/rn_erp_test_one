import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)';

// global.fetch = jest.fn(() => {
//     return Promise.resolve({
//         json: () => Promise.resolve([
//             {id: 1, name: "Name 1", email: "email1@mail.com"},
//             {id: 2, name: "Name 2", email: "email2@mail.com"}
//         ]),
//     })
// }) as jest.Mock;

describe('HomeScreen', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        jest.advanceTimersByTime(5000);
    });

    // it('deve renderizar corretamente', async () => {
    //     render(<HomeScreen />);

    //     await waitFor(() => {
    //         expect(screen.getByText(/Dados do ERP/i)).toBeTruthy();
    //     });
    // });

    it('deve renderizar corretamente', async () => {
        render(<HomeScreen />);

        expect(screen.getByText(/Dados do ERP/i)).toBeTruthy();
    });
    afterEach(() => {
        jest.useRealTimers();
    });
});