import React from 'react'
import loading from './Iphone-spinner-2.gif'
function spinner() {
  return (
    <div className="text-center">
      <img className="my-3" src={loading} alt="loading" />
    </div>
  )
}

export default spinner
