import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserData.context"
import { Spinner } from "../Spinner";

/**
 * @description MoreInfo Component
 * @returns {JSX.Element}
 */
export const MoreInfo = () => {
  const navigate = useNavigate();
  const { terms, setTerms, setColor } = useContext(UserDataContext)
  const [colors, setColors] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getColors() {
      setLoading(true)
      const response = await fetch('http://localhost:3001/api/colors')
      const data = await response.json()
      setColors(data || [])
      setLoading(false)
    }
    getColors()
  }, [])

  /**
   * @description Handle Next Button Click
   */
  const handleNextClicked = () => navigate('/confirmation')

  /**
  * @description Handle Back Button Click
  */
  const handleBackClicked = () => navigate('/')

  /**
   * @description Handle change on the input fields
   * @param {MouseEvent} evt
   */
  const handleChange = (evt) => setTerms(evt?.target?.checked || false)

  /**
   * @description Handle change on the input fields
   * @param {MouseEvent} evt
   */
  const handleColorChange = (evt) => setColor(evt?.target?.value || "")

  return (
    <div className="page-container">
      <div className="row">
        <span className="page-heading">ADDITIONAL INFO</span>
      </div>
      <div className="row">
        {
          loading
            ? <Spinner />
            : (
              <select onChange={handleColorChange}>
                <option>SELECT YOUR FAVORITE COLOR</option>
                {colors.map((color) => <option key={color}>{color}</option>)}
              </select>
            )
        }
      </div>
      <div className="row">
        <input type="checkbox" className="checkbox" id="terms" checked={terms} onChange={handleChange} />
        <label htmlFor="terms">I AGREE TO TERMS AND CONDITIONS</label>
      </div>
      <div className="button-container">
        <button className="back-button" onClick={handleBackClicked}>BACK</button>
        <button className="next-button" onClick={handleNextClicked}>NEXT</button>
      </div>
    </div>
  )
}