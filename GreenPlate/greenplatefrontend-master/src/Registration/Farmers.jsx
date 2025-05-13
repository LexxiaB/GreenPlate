import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FarmerRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    farmName: "",
    acceptsCompost: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

  // Check if registration data exists in session storage
  useEffect(() => {
    const registrationData = sessionStorage.getItem("registrationData");
    if (!registrationData) {
      // Redirect to signup if no registration data exists
      navigate("/signup");
    } else {
      const parsedData = JSON.parse(registrationData);
      if (parsedData.userType !== "farmer") {
        // Redirect to user type selection if not a farmer
        navigate("/select-user-type");
      }
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggle = () => {
    setFormData({
      ...formData,
      acceptsCompost: !formData.acceptsCompost,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Get the registration data from session storage
      const registrationData = JSON.parse(
        sessionStorage.getItem("registrationData") || "{}"
      );

      // Combine the data
      const completeData = {
        name: registrationData.fullName,
        email: registrationData.email,
        password: registrationData.password,
        contactNumber: registrationData.contactNumber,
        farmName: formData.farmName,
        acceptsCompost: formData.acceptsCompost,
      };
      const response = await axios.post(
        `${baseUrl}/auth/register/farmer`,
        completeData,
        { headers: { "Content-Type": "application/json" } }
      );

      // Check if registration was successful
      if (response.data.includes("Farmer created") || response.status === 200) {
        // Clear session storage after successful registration
        sessionStorage.removeItem("registrationData");

        // Navigate to the farmer dashboard
        navigate("/farmers");
      } else {
        // Handle unexpected response
        throw new Error("Registration failed with an unexpected response");
      }
      // DEVELOPMENT MODE: For testing without backend
      // Remove this block when backend is ready with CORS
      console.log("Registration data that would be sent:", completeData);

      // Simulate a successful API response
      setTimeout(() => {
        // Clear session storage after successful registration
        sessionStorage.removeItem("registrationData");

        // Navigate to the farmer dashboard
        navigate("/login");
        setIsLoading(false);
      }, 1500);

      return;

      // PRODUCTION MODE: Uncomment this when backend is ready

      // Send registration request
    } catch (err) {
      console.error("Registration error:", err);

      // Handle error message
      if (err.message && err.message.includes("Network Error")) {
        setError(
          "Unable to connect to the server. This may be due to CORS restrictions. Please contact the administrator."
        );
      } else {
        setError(
          err.response?.data || "Registration failed. Please try again."
        );
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">Farm Details</h1>
          <p className="text-green-500 mt-2">
            Set up your farm profile on Green Plate
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="farmName" className="block text-green-700 mb-2">
              Farm Name
            </label>
            <input
              type="text"
              id="farmName"
              name="farmName"
              value={formData.farmName}
              onChange={handleInputChange}
              className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your farm name"
              required
            />
          </div>

          <div className="mb-8">
            <div
              className="p-4 border rounded-lg cursor-pointer flex items-center"
              onClick={handleToggle}
            >
              <div
                className={`w-10 h-6 flex ${
                  formData.acceptsCompost ? "bg-green-500" : "bg-gray-200"
                } rounded-full p-1 transition-colors duration-300 ease-in-out`}
              >
                <span
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    formData.acceptsCompost ? "translate-x-4" : ""
                  }`}
                ></span>
              </div>
              <div className="ml-3">
                <p className="font-medium text-green-700">Accept Compost</p>
                <p className="text-sm text-green-600">
                  Receive compost from local restaurants
                </p>
              </div>
            </div>
            {formData.acceptsCompost && (
              <div className="mt-3 ml-2 text-sm text-green-600">
                <p>✓ Get free organic matter for your soil</p>
                <p>✓ Be part of the circular economy</p>
                <p>✓ Reduce waste in landfills</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FarmerRegistration;
