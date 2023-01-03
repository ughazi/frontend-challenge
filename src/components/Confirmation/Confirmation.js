import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../constants';
import { UserDataContext } from '../../contexts/UserData.context';
import { useFetch } from '../../hooks/useFetch.hook';
import { Spinner } from '../Spinner';

/**
 * @description Confirmation Component
 * @returns {JSX.Element}
 */
export const Confirmation = () => {
  const { pageHeadings, apiUrl, apiSubmitPath } = constants;

  const navigate = useNavigate();
  const { name, email, password, color, terms } = useContext(UserDataContext);
  const [{ loading, data, error }, fetchData] = useFetch();

  useEffect(() => {
    if (!loading && data) {
      navigate('/success');
    } else if (!loading && error) {
      navigate('/error');
    }
  }, [data, error, navigate, loading]);

  /**
   * @description Handle Next Button Click
   */
  const handleSubmitClicked = async () => {
    const submitUrl = `${apiUrl}/${apiSubmitPath}`;
    const body = JSON.stringify({ name, email, password, color, terms });
    fetchData(submitUrl, false, 'POST', body);
  };

  /**
   * @description Handle Back Button Click
   */
  const handleBackClicked = () => navigate('/more-info');

  return (
    <div className="page-container">
      <div className="row">
        <span className="page-heading">{pageHeadings.CONFIRMATION}</span>
      </div>
      <div className="row">
        <ul>
          <li>{name}</li>
          <li>{email}</li>
          <li>{password.replace(/./g, '*')}</li>
          <li>{color}</li>
          <li>{terms ? 'AGREED' : 'NOT AGREED'}</li>
        </ul>
      </div>
      <div className="button-container">
        <button className="back-button" onClick={handleBackClicked}>
          BACK
        </button>
        <button className="submit-button" onClick={handleSubmitClicked}>
          SUBMIT
        </button>
      </div>
      {loading && <Spinner />}
    </div>
  );
};
