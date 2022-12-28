import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserData.context";


export const ErrorComponent = () => {
  const navigate = useNavigate()
  const { resetState } = useContext(UserDataContext)

  /** 
  * @description Handle Restart Click
  */
  const handleRestartClicked = () => {
    resetState()
    navigate('/')
  }

  return (
     <div className="page-container">
      <div className="row">
        <span className="page-heading">ERROR</span>
      </div>
      <div className="row">
        <span className="page-heading">&#10060;</span>
      </div>
      <div className="row">
        <span>UH OH, SOMETHING WENT WRONG. PLEASE TRY AGAIN LATER.</span>
      </div>
      <div className="button-container">
        <button className="restart-button" onClick={handleRestartClicked}>RESTART</button>
      </div>
    </div>
  )
}