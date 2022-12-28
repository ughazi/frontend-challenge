import React from "react"
import { Route, Routes } from "react-router-dom"
import { Confirmation } from "../Confirmation"
import { ErrorComponent } from "../Error"
import { MoreInfo } from "../MoreInfo"
import { NotFound } from "../NotFound"
import { Signup } from "../Signup"
import { Success } from "../Success"

/**
 * @description `Routing` component
 * @returns {JSX.Element}
 */
export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/more-info" element={<MoreInfo />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/success" element={<Success />} />
      <Route path="/error" element={<ErrorComponent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
