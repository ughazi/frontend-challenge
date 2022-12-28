import React from "react"
import { TailSpin } from "react-loader-spinner"

export const Spinner = () => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="black"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  )
}