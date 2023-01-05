import '@testing-library/jest-dom';
import * as router from 'react-router';

import { customRender, fireEvent, waitFor } from '../../utils/test-utils';
import { constants } from '../../constants';
import * as useFetchHook from '../../hooks/useFetch.hook';
import { MoreInfo } from './MoreInfo';

const { PAGE_HEADINGS, TERMS_LABEL, BUTTON_TEXT, API_URL, COLORS_PATH, COLORS_ERROR, SPINNER_LOADING_LABEL, SELECT_COLOR_OPTION } = constants;

const mockNavigateFn = jest.fn();
const mockFetchDataFn = jest.fn();

describe('MoreInfo.js', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigateFn);

    jest.spyOn(useFetchHook, 'useFetch').mockReturnValue([
      {
        data: ['black', 'blue', 'red', 'yellow'],
        loading: false,
        error: false
      },
      mockFetchDataFn
    ]);
  });

  const providerProps = {
    name: 'test',
    password: 'abc123',
    email: 'test@test.com',
    color: 'test-color',
    terms: true,
    setColor: jest.fn(),
    setTerms: jest.fn()
  };

  it('renders MoreInfo component correctly with correct provider props.', async () => {
    // ACT
    const { getByText } = customRender(<MoreInfo />, { providerProps });

    // ASSERT
    expect(getByText(PAGE_HEADINGS.ADDITIONAL_INFO)).toBeInTheDocument();
  });

  it('calls the fetchData() hook to retrieve the list of colors.', async () => {
    // ACT
    customRender(<MoreInfo />, { providerProps });

    // ASSERT
    expect(mockFetchDataFn).toHaveBeenCalled();
    expect(mockFetchDataFn).toHaveBeenCalledWith(`${API_URL}/${COLORS_PATH}`);
  });

  it('renders Next and Back buttons.', async () => {
    // ACT
    const { getAllByRole } = customRender(<MoreInfo />, { providerProps });
    const buttons = getAllByRole('button');

    // ASSERT
    expect(buttons).toHaveLength(2);
    expect(buttons[0].innerHTML).toBe(BUTTON_TEXT.BACK);
    expect(buttons[1].innerHTML).toBe(BUTTON_TEXT.NEXT);
  });

  it('renders the Terms & Conditions label', async () => {
    // ACT
    const { getByLabelText } = customRender(<MoreInfo />, { providerProps });

    // ASSERT
    expect(getByLabelText(TERMS_LABEL)).toBeInTheDocument();
  });

  it('should call navigate() method with the path "/" when Back button is clicked and submit request returns successfully', async () => {
    // ARRANGE
    const { getByRole } = customRender(<MoreInfo />, { providerProps });

    // ACT
    fireEvent.click(getByRole('button', { name: BUTTON_TEXT.BACK }));

    // ASSERT
    expect(mockNavigateFn).toHaveBeenCalledWith('/');
  });

  it('should call navigate() method with the path "/confirmation" when Next button is clicked', async () => {
    // ARRANGE
    const { getByRole } = customRender(<MoreInfo />, { providerProps });

    // ACT
    fireEvent.click(getByRole('button', { name: BUTTON_TEXT.NEXT }));

    // ASSERT
    expect(mockNavigateFn).toHaveBeenCalledWith('/confirmation');
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

    // ACT
    const { getByLabelText } = customRender(<MoreInfo />, { providerProps });

    // ASSERT
    await waitFor(() => {
      expect(getByLabelText(SPINNER_LOADING_LABEL)).toBeInTheDocument();
    });
  });

  it('should render Error Text for Colors if there was an error retrieving colors', async () => {
    // ARRANGE
    jest.spyOn(useFetchHook, 'useFetch').mockReturnValue([
      {
        data: null,
        loading: false,
        error: true
      },
      mockFetchDataFn
    ]);

    // ACT
    const { getByText } = customRender(<MoreInfo />, { providerProps });

    // ASSERT
    expect(getByText(COLORS_ERROR)).toBeInTheDocument();
  });

  it('should display the default option in the select dropdown', async () => {
    // ACT
    const { getByText } = customRender(<MoreInfo />, { providerProps });

    // ASSERT
    expect(getByText(SELECT_COLOR_OPTION).selected).toBe(true);
  });

  it('should not display any other option other than default option if no colors are retrieved from the api', async () => {
    jest.spyOn(useFetchHook, 'useFetch').mockReturnValue([
      {
        data: [],
        loading: false,
        error: false
      },
      mockFetchDataFn
    ]);
    // ACT
    const { getByRole, getByText } = customRender(<MoreInfo />, { providerProps });
    const select = getByRole('combobox');

    // ASSERT
    expect(select.children.length).toBe(1);
    expect(getByText(SELECT_COLOR_OPTION).selected).toBe(true);
  });

  it('should allow user to change the colors in the select dropdown', async () => {
    // ACT
    const { getByRole } = customRender(<MoreInfo />, { providerProps });
    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: 'red' } });

    // ASSERT
    expect(providerProps.setColor).toHaveBeenCalledWith('red');
  });

  it('should allow user to select/deselect the terms and conditions checkbox', async () => {
    // ACT
    const { getByRole } = customRender(<MoreInfo />, { providerProps });
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    const currentTermsAndConditionsVal = providerProps.terms;
    // ASSERT
    expect(providerProps.setTerms).toHaveBeenCalledWith(!currentTermsAndConditionsVal);
  });
});
