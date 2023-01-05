import '@testing-library/jest-dom';
import * as router from 'react-router';

import { customRender } from '../../utils/test-utils';
import { constants } from '../../constants';
import { NotFound } from './NotFound';

const { ROUTE_NOT_FOUND_ERROR } = constants;

const mockNavigateFn = jest.fn();

describe('NotFound.js', () => {
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

  it('renders Error component correctly with correct provider props.', async () => {
    // ACT
    const { getByText } = customRender(<NotFound />, { providerProps });
    // ASSERT
    expect(getByText(ROUTE_NOT_FOUND_ERROR)).toBeInTheDocument();
  });
});
