import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../constants';
import { UserDataContext } from '../../contexts/UserData.context';

export const ErrorComponent = () => {
  const { PAGE_HEADINGS, BUTTON_TEXT, ERROR_TEXT } = constants;

  const navigate = useNavigate();
  const { resetState } = useContext(UserDataContext);

  /**
   * @description Handle Restart Click
   */
  const handleRestartClicked = () => {
    resetState();
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="row">
        <span className="page-heading">{PAGE_HEADINGS.ERROR}</span>
      </div>
      <div className="row">
        <span className="page-heading">&#10060;</span>
      </div>
      <div className="row">
        <span>{ERROR_TEXT}</span>
      </div>
      <div className="button-container">
        <button className="restart-button" onClick={handleRestartClicked}>
          {BUTTON_TEXT.RESTART}
        </button>
      </div>
    </div>
  );
};
