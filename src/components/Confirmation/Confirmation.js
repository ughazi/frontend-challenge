import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserData.context"
import { Spinner } from "../Spinner";

/**
 * @description Confirmation Component
 * @returns {JSX.Element}
 */
export const Confirmation = () => {
  const navigate = useNavigate();
  const { name, email, password, color, terms } = useContext(UserDataContext)
  const [loading, setLoading] = useState(false)

  /**
   * @description Handle Next Button Click
   */
  const handleSubmitClicked = async () => {
    setLoading(true)
    const response = await fetch('http://localhost:3001/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        color,
        terms
      })
    })

    setLoading(false)
    const { status } = response
    status === 200 ? navigate('/success') : navigate('/error')
  }

  /**
  * @description Handle Back Button Click
  */
  const handleBackClicked = () => navigate('/more-info')

  return (
    <div className="page-container">
      {
        loading ? <Spinner /> :
          (
            <>
              <div className="row">
                <span className="page-heading">CONFIRMATION</span>
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
                <button className="back-button" onClick={handleBackClicked}>BACK</button>
                <button className="submit-button" onClick={handleSubmitClicked}>SUBMIT</button>
              </div>
            </>
          )
      }
    </div>
  )
}