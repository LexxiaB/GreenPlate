import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RestaurantRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantName: "",
    offersCompost: false,
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
      if (parsedData.userType !== "restaurant") {
        // Redirect to user type selection if not a restaurant
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
      offersCompost: !formData.offersCompost,
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
        restaurantName: formData.restaurantName,
        offersCompost: formData.offersCompost,
      };

      // Send registration request
      const response = await axios.post(
        `${baseUrl}/auth/register/restaurant`,
        completeData,
        { headers: { "Content-Type": "application/json" } }
      );

      // Check if registration was successful based on your API response
      if (
        response.data === "Restaurant registered successfully" ||
        response.status === 200
      ) {
        // Clear session storage after successful registration
        sessionStorage.removeItem("registrationData");

        // Navigate to the restaurant dashboard
        navigate("/login");
      } else {
        // Handle unexpected response
        throw new Error("Registration failed with an unexpected response");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">
            Restaurant Details
          </h1>
          <p className="text-green-500 mt-2">
            Set up your restaurant profile on Green Plate
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="restaurantName"
              className="block text-green-700 mb-2"
            >
              Restaurant Name
            </label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleInputChange}
              className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your restaurant name"
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
                  formData.offersCompost ? "bg-green-500" : "bg-gray-200"
                } rounded-full p-1 transition-colors duration-300 ease-in-out`}
              >
                <span
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    formData.offersCompost ? "translate-x-4" : ""
                  }`}
                ></span>
              </div>
              <div className="ml-3">
                <p className="font-medium text-green-700">Offer Compost</p>
                <p className="text-sm text-green-600">
                  Allow excess food to be composted by local farmers
                </p>
              </div>
            </div>
            {formData.offersCompost && (
              <div className="mt-3 ml-2 text-sm text-green-600">
                <p>✓ Help reduce food waste</p>
                <p>✓ Support local farmers</p>
                <p>✓ Contribute to sustainability</p>
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

export default RestaurantRegistration;
