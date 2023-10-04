import React from 'react'

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded shadow p-8 m-4 md:max-w-sm md:mx-auto">
            <div className="text-center">
            <h1 className="text-2xl">Payment Successful</h1>
            <p>Thanks for buying!</p>
            </div>
        </div>
    </div>
  )
}

export default Success