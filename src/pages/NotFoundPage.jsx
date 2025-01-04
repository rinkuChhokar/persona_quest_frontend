import React from 'react'
import NotFoundLogo from "/public/images/notFound.jpg";

const NotFoundPage = () => {
  return (
    <div>
      <div className="flex justify-center">
        <img className="w-[500px] h-[500px] mt-20" src={NotFoundLogo} alt="" />
      </div>
    </div>
  )
}

export default NotFoundPage