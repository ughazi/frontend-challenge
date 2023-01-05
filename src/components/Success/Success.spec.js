import '@testing-library/jest-dom';
import * as router from 'react-router';

import { customRender, fireEvent, render } from '../../utils/test-utils';
import { Success } from './Success';
import { constants } from '../../constants';
import { UserDataContext } from '../../contexts/UserData.context';

const { PAGE_HEADINGS, CONFIRMATION_TEXT, BUTTON_TEXT } = constants;

const mockNavigateFn = jest.fn();

describe('Success.js', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigateFn);
  });

  // ARRANGE
  const providerProps = {
    name: 'test',
    password: 'abc123',
    email: 'test@test.com',
    color: 'test-color',
    terms: true
  };

  it('renders Success component correctly with correct provider props.', async () => {
    // ACT
    const { getByText } = customRender(<Success />, { providerProps });
    // ASSERT
    expect(getByText(PAGE_HEADINGS.SUCCESS)).toBeInTheDocument();
  });

  it('renders Restart button.', async () => {
    // ACT
    const { getAllByRole } = customRender(<Success />, { providerProps });
    const buttons = getAllByRole('button');
    // ASSERT
    expect(buttons).toHaveLength(1);
    expect(buttons[0].innerHTML).toBe(BUTTON_TEXT.RESTART);
  });

  it('renders the Confirmation text.', async () => {
    // ACT
    const { getByText } = customRender(<Success />, { providerProps });

    // ASSERT
    expect(getByText(CONFIRMATION_TEXT)).toBeInTheDocument();
  });

  it('should call navigate() method with the path / when restart button is clicked', async () => {
    // ARRANGE
    const resetState = jest.fn();
    const { getByRole } = render(
      <UserDataContext.Provider value={{ resetState }}>
        <Success />
      </UserDataContext.Provider>
    );

    // ACT
    fireEvent.click(getByRole('button', { name: BUTTON_TEXT.RESTART }));

    // ASSERT
    expect(mockNavigateFn).toHaveBeenCalledWith('/');
  });

  it('should call resetState() method of the context when restart button is clicked', async () => {
    // ARRANGE
    const resetState = jest.fn();
    const { getByRole } = render(
      <UserDataContext.Provider value={{ resetState }}>
        <Success />
      </UserDataContext.Provider>
    );

    // ACT
    fireEvent.click(getByRole('button', { name: BUTTON_TEXT.RESTART }));

    // ASSERT
    expect(resetState).toHaveBeenCalled();
  });
});
