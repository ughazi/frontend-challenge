
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserData.context"

/**
 * @description Signup Component
 * @returns {JSX.Element}
 */
export const Signup = () => {
  const navigate = useNavigate();
  const { name, email, password, setName, setEmail, setPassword } = useContext(UserDataContext)

  /**
   * @description Handle Next Button Click
   */
  const handleNextClicked = () => navigate('/more-info')

  /**
   * @description Handle change on the input fields
   * @param {string} fieldName
   * @param {KeyboardEvent} evt
   */
  const handleChange = (fieldName, evt) => {
    switch (fieldName) {
      case "name":
        setName(evt.target.value ?? "")
        break
      case "email":
        setEmail(evt.target.value ?? "")
        break
      case "password":
        setPassword(evt.target.value ?? "")
        break
      default:
        return
    }
  }

  return (
    <div className="page-container">
      <div className="row">
        <span className="page-heading">SIGN UP</span>
      </div>
      <form onSubmit={handleNextClicked}>
        <div className="row">
          <input 
            type="text" 
            className="form-input" 
            placeholder="FIRST NAME" 
            value={name} 
            onChange={handleChange.bind(null, 'name')}
            required
          />
        </div>
        <div className="row">
          <input 
            type="email"
            className="form-input"
            placeholder="EMAIL"
            value={email}
            onChange={handleChange.bind(null, 'email')}
            required
          />
        </div>
        <div className="row">
          <input
            type="password"
            className="form-input"
            placeholder="PASSWORD"
            value={password}
            onChange={handleChange.bind(null, 'password')}
            required
          />
        </div>
        <div className="button-container">
          <button className="next-button" type="submit">NEXT</button>
        </div>
      </form>
    </div>
  )
}