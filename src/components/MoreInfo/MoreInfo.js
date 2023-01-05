import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../constants';
import { UserDataContext } from '../../contexts/UserData.context';
import { useFetch } from '../../hooks/useFetch.hook';
import { Spinner } from '../Spinner';

/**
 * @description MoreInfo Component
 * @returns {JSX.Element}
 */
export const MoreInfo = () => {
  const { API_URL, COLORS_PATH, COLORS_ERROR, PAGE_HEADINGS, TERMS_LABEL, SELECT_COLOR_OPTION } = constants;

  const navigate = useNavigate();
  const { terms, setTerms, setColor } = useContext(UserDataContext);
  const [{ data: colors = [], error, loading }, fetchData] = useFetch();

  useEffect(() => {
    const getColorsUrl = `${API_URL}/${COLORS_PATH}`;
    fetchData(getColorsUrl);
  }, [COLORS_PATH, API_URL, fetchData]);

  /**
   * @description Handle Next Button Click
   */
  const handleNextClicked = () => navigate('/confirmation');

  /**
   * @description Handle Back Button Click
   */
  const handleBackClicked = () => navigate('/');

  /**
   * @description Handle change on the input fields
   * @param {MouseEvent} evt
   */
  const handleChange = (evt) => setTerms(evt?.target?.checked || false);

  /**
   * @description Handle change on the input fields
   * @param {MouseEvent} evt
   */
  const handleColorChange = (evt) => setColor(evt?.target?.value || '');

  return (
    <div className="page-container">
      {error && (
        <div className="row">
          <span className="info">{COLORS_ERROR}</span>
        </div>
      )}
      <div className="row">
        <span className="page-heading">{PAGE_HEADINGS.ADDITIONAL_INFO}</span>
      </div>
      <div className="row">
        {loading ? (
          <Spinner />
        ) : (
          <select onChange={handleColorChange}>
            <option>{SELECT_COLOR_OPTION}</option>
            {colors?.map((color) => (
              <option key={color}>{color}</option>
            ))}
          </select>
        )}
      </div>
      <div className="row">
        <input type="checkbox" className="checkbox" id="terms" checked={terms} onChange={handleChange} />
        <label htmlFor="terms">{TERMS_LABEL}</label>
      </div>
      <div className="button-container">
        <button className="back-button" onClick={handleBackClicked}>
          BACK
        </button>
        <button className="next-button" onClick={handleNextClicked}>
          NEXT
        </button>
      </div>
    </div>
  );
};
