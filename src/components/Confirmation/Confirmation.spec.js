import '@testing-library/jest-dom';
import * as router from 'react-router';

import { customRender, fireEvent, waitFor } from '../../utils/test-utils';
import { Confirmation } from './Confirmation';
import { constants } from '../../constants';
import * as useFetchHook from '../../hooks/useFetch.hook';

const { PAGE_HEADINGS, TERMS_TEXT, BUTTON_TEXT, SPINNER_LOADING_LABEL } = constants;

const mockNavigateFn = jest.fn();
const mockFetchDataFn = jest.fn();

describe('Confirmation.js', () => {
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
    terms: true
  };

  it('renders Confirmation component correctly with correct provider props.', async () => {
    // ACT
    const { getByText } = customRender(<Confirmation />, { providerProps });
    // ASSERT
    expect(getByText(PAGE_HEADINGS.CONFIRMATION)).toBeInTheDocument();
  });

  it('renders Back and Submit buttons.', async () => {
    // ACT
    const { getAllByRole } = customRender(<Confirmation />, { providerProps });
    const buttons = getAllByRole('button');
    // ASSERT
    expect(buttons).toHaveLength(2);
    expect(buttons[0].innerHTML).toBe(BUTTON_TEXT.BACK);
    expect(buttons[1].innerHTML).toBe(BUTTON_TEXT.SUBMIT);
  });

  it('renders the list of values entered/selected by the user.', async () => {
    // ACT
    const { getAllByRole } = customRender(<Confirmation />, { providerProps });
    const listItems = getAllByRole('listitem');

    // ASSERT
    expect(listItems).toHaveLength(5);
  });

  it('renders the password after masking all of its characters', async () => {
    // ACT
    const { getAllByRole } = customRender(<Confirmation />, { providerProps });
    const listItems = getAllByRole('listitem');
    const renderedPassword = listItems[2]?.innerHTML;
    const renderedPasswordLength = renderedPassword?.length;
    const passwordPropLength = providerProps.password.length;
    // ASSERT
    expect(renderedPasswordLength).toEqual(passwordPropLength);
    expect(renderedPassword).toEqual(providerProps.password.replace(/./g, '*'));
  });

  it('renders term list item as AGREED if user has agreed to terms and conditions', async () => {
    // ACT
    const { getAllByRole } = customRender(<Confirmation />, { providerProps });
    const listItems = getAllByRole('listitem');
    const renderedTermsText = listItems[4]?.innerHTML;
    // ASSERT
    expect(renderedTermsText).toEqual(TERMS_TEXT.AGREED);
  });

  it('renders term list item as NOT AGREED if user has not agreed to terms and conditions', async () => {
    // ARRANGE
    const notAgreedProps = {
      ...providerProps,
      terms: false
    };
    // ACT
    const { getAllByRole } = customRender(<Confirmation />, { providerProps: notAgreedProps });
    const listItems = getAllByRole('listitem');
    const renderedTermsText = listItems[4]?.innerHTML;
    // ASSERT
    expect(renderedTermsText).toEqual(TERMS_TEXT.NOT_AGREED);
  });

  it('should call the useFetch() hook and clicking Submit button', async () => {
    // ARRANGE
    const { getByRole } = customRender(<Confirmation />, { providerProps });

    // ACT
    fireEvent.click(getByRole('button', { name: BUTTON_TEXT.SUBMIT }));

    // ASSERT
    expect(mockFetchDataFn).toHaveBeenCalled();
  });

  it('should call navigate() method with the path /success when submit button is clicked and submit request returns successfully', async () => {
    // ARRANGE
    const { getByRole } = customRender(<Confirmation />, { providerProps });

    // ACT
    fireEvent.click(getByRole('button', { name: BUTTON_TEXT.SUBMIT }));

    // ASSERT
    expect(mockNavigateFn).toHaveBeenCalledWith('/success');
  });

  it('should call navigate() method with the path /error when submit button is clicked', async () => {
    // ARRANGE
    jest.spyOn(useFetchHook, 'useFetch').mockReturnValue([
      {
        data: null,
        loading: false,
        error: true
      },
      mockFetchDataFn
    ]);
    const { getByRole } = customRender(<Confirmation />, { providerProps });

    // ACT
    fireEvent.click(getByRole('button', { name: BUTTON_TEXT.SUBMIT }));

    // ASSERT
    expect(mockNavigateFn).toHaveBeenCalledWith('/error');
  });

  it('should render Loading spinner if the request is in flight', async () => {
    // ARRANGE
    jest.spyOn(useFetchHook, 'useFetch').mockReturnValue([
      {
        data: null,
        loading: true,
        error: null
      },
      mockFetchDataFn
    ]);
    const { getByRole, getByLabelText } = customRender(<Confirmation />, { providerProps });

    // ACT
    fireEvent.click(getByRole('button', { name: BUTTON_TEXT.SUBMIT }));

    // ASSERT
    await waitFor(() => {
      expect(getByLabelText(SPINNER_LOADING_LABEL)).toBeInTheDocument();
    });
  });
});
