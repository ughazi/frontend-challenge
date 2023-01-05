import '@testing-library/jest-dom';
import * as router from 'react-router';

import { customRender, fireEvent } from '../../utils/test-utils';
import { Signup } from './Signup';
import { constants } from '../../constants';
import * as useFetchHook from '../../hooks/useFetch.hook';

const { PAGE_HEADINGS, BUTTON_TEXT } = constants;

const mockNavigateFn = jest.fn();
const mockFetchDataFn = jest.fn();

describe('Signup.js', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigateFn);

    jest.spyOn(useFetchHook, 'useFetch').mockReturnValue([
      {
        data: [],
        loading: false,
        error: false
      },
      mockFetchDataFn
    ]);
  });

  // ARRANGE
  const providerProps = {
    name: 'test',
    password: 'abc123',
    email: 'test@test.com',
    color: 'test-color',
    terms: true,
    setName: jest.fn(),
    setEmail: jest.fn(),
    setPassword: jest.fn()
  };

  it('renders Signup component correctly with correct provider props.', async () => {
    // ACT
    const { getByText } = customRender(<Signup />, { providerProps });
    // ASSERT
    expect(getByText(PAGE_HEADINGS.SIGN_UP)).toBeInTheDocument();
  });

  it('renders Next button.', async () => {
    // ACT
    const { getAllByRole } = customRender(<Signup />, { providerProps });
    const buttons = getAllByRole('button');
    // ASSERT
    expect(buttons).toHaveLength(1);
    expect(buttons[0].innerHTML).toBe(BUTTON_TEXT.NEXT);
  });

  it('should call navigate() method with the path /more-info when submit button is clicked and submit request returns successfully', async () => {
    // ARRANGE
    const { getByRole } = customRender(<Signup />, { providerProps });

    // ACT
    fireEvent.click(getByRole('button', { name: BUTTON_TEXT.NEXT }));

    // ASSERT
    expect(mockNavigateFn).toHaveBeenCalledWith('/more-info');
  });

  it('call the setName method on change on Name input field', async () => {
    // ACT
    const { getAllByRole } = customRender(<Signup />, { providerProps });
    const textFields = getAllByRole('textbox');
    const nameTextField = textFields[0];
    fireEvent.change(nameTextField, { target: { value: 'some text' } });

    // ASSERT
    expect(providerProps.setName).toHaveBeenCalledWith('some text');
  });

  it('call the setEmail method on change on Name input field', async () => {
    // ACT
    const { getAllByRole } = customRender(<Signup />, { providerProps });
    const textFields = getAllByRole('textbox');
    const nameTextField = textFields[1];
    fireEvent.change(nameTextField, { target: { value: 'some email' } });

    // ASSERT
    expect(providerProps.setEmail).toHaveBeenCalledWith('some email');
  });

  it('call the setPassword method on change on Name input field', async () => {
    // ACT
    const { getByLabelText } = customRender(<Signup />, { providerProps });
    const passwordInput = getByLabelText('password');
    fireEvent.change(passwordInput, { target: { value: 'some password' } });

    // ASSERT
    expect(providerProps.setPassword).toHaveBeenCalledWith('some password');
  });
});
