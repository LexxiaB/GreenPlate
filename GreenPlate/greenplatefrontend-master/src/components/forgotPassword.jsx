import { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Password reset requested for:', email)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md text-center">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-green-600">Green Plate</h1>
          <p className="text-green-500 mt-2">Reset your password</p>
        </div>
        
        {!submitted ? (
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-green-700 mb-4 text-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <label className="block text-green-600 mb-2 text-left" htmlFor="email">Email</label>
              <input 
                id="email"
                type="email" 
                className="w-full p-2 border border-green-300 rounded bg-white text-green-700" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
            >
              Send Reset Link
            </button>

            <div className="mt-4 text-center">
              <Link to="/login" className="text-green-600 text-sm hover:underline">
                Back to login
              </Link>
            </div>
          </form>
        ) : (
          <div className="p-6">
            <div className="p-4 bg-green-50 text-green-700 rounded mb-6">
              Check your email! We've sent a password reset link to {email}.
            </div>
            <Link to="/login" className="text-green-600 hover:underline">
              Back to login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword