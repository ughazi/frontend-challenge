import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../contexts/UserData.context';

/**
 * @description MoreInfo Component
 * @returns {JSX.Element}
 */
export const Success = () => {
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
        <span className="page-heading">SUCCESS!</span>
      </div>
      <div className="icon">
        <span className="page-heading">&#10003;</span>
      </div>
      <div className="row">
        <span>YOU SHOULD RECEIVE A CONFIRMATION EMAIL SOON.</span>
      </div>
      <div className="button-container">
        <button className="restart-button" onClick={handleRestartClicked}>
          RESTART
        </button>
      </div>
    </div>
  );
};
