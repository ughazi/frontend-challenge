import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../constants';
import { UserDataContext } from '../../contexts/UserData.context';

/**
 * @description MoreInfo Component
 * @returns {JSX.Element}
 */
export const Success = () => {
  const { PAGE_HEADINGS, CONFIRMATION_TEXT, BUTTON_TEXT } = constants;
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
        <span className="page-heading">{PAGE_HEADINGS.SUCCESS}</span>
      </div>
      <div className="icon">
        <span className="page-heading">&#10003;</span>
      </div>
      <div className="row">
        <span>{CONFIRMATION_TEXT}</span>
      </div>
      <div className="button-container">
        <button className="restart-button" onClick={handleRestartClicked}>
          {BUTTON_TEXT.RESTART}
        </button>
      </div>
    </div>
  );
};
