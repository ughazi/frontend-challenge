import '@testing-library/jest-dom';
import * as router from 'react-router';

import { customRender } from '../../utils/test-utils';
import { constants } from '../../constants';
import { Routing } from './Routing';

const { PAGE_HEADINGS } = constants;

const mockNavigateFn = jest.fn();

describe('Routing.js', () => {
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

  it('renders the SignUp component on base route', async () => {
    // ACT
    const baseRoute = '/';
    const { getByText } = customRender(<Routing />, { providerProps, route: baseRoute });

    // ASSERT
    expect(getByText(PAGE_HEADINGS.SIGN_UP)).toBeInTheDocument();
  });

  it('renders the MoreInfo component on "/more-info" route', async () => {
    // ACT
    const route = '/more-info';
    const { getByText } = customRender(<Routing />, { providerProps, route });

    // ASSERT
    expect(getByText(PAGE_HEADINGS.ADDITIONAL_INFO)).toBeInTheDocument();
  });

  it('renders the Confirmation component on "/confirmation" route', async () => {
    // ACT
    const route = '/confirmation';
    const { getByText } = customRender(<Routing />, { providerProps, route });
    // ASSERT

    expect(getByText(PAGE_HEADINGS.CONFIRMATION)).toBeInTheDocument();
  });

  it('renders the Success component on "/success" route', async () => {
    // ACT
    const route = '/success';
    const { getByText } = customRender(<Routing />, { providerProps, route });
    // ASSERT

    expect(getByText(PAGE_HEADINGS.SUCCESS)).toBeInTheDocument();
  });

  it('renders the Error component on "/error" route', async () => {
    // ACT
    const route = '/error';
    const { getByText } = customRender(<Routing />, { providerProps, route: route });
    // ASSERT

    expect(getByText(PAGE_HEADINGS.ERROR)).toBeInTheDocument();
  });

  it('renders the NotFound component on a random route', async () => {
    // ACT
    const route = '/wrong-path';
    const { getByText } = customRender(<Routing />, { providerProps, route });
    // ASSERT

    expect(getByText(PAGE_HEADINGS.NOT_FOUND)).toBeInTheDocument();
  });
});
