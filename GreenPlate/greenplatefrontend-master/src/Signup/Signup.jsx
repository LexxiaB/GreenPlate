import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      // Store the basic registration data in sessionStorage to access later
      // We don't store the confirmPassword as it's not needed anymore
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        password: formData.password,
      };

      // Save to session storage to retrieve in next steps
      sessionStorage.setItem(
        "registrationData",
        JSON.stringify(registrationData)
      );

      // Navigate to the user type selection page
      navigate("/select-user-type");
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md text-center">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-green-600">Green Plate</h1>
          <p className="text-green-500 mt-2">Create your account</p>
        </div>

        <form className="p-6" onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-green-600 mb-2 text-left"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="w-full p-2 border border-green-300 rounded bg-white text-green-700"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-green-600 mb-2 text-left"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-2 border border-green-300 rounded bg-white text-green-700"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-green-600 mb-2 text-left"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              className="w-full p-2 border border-green-300 rounded bg-white text-green-700"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-green-600 mb-2 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full p-2 border border-green-300 rounded bg-white text-green-700"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-green-600 mb-2 text-left"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full p-2 border border-green-300 rounded bg-white text-green-700"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Continue"}
          </button>

          <div className="mt-4 text-center">
            <p className="text-green-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
