// ConsumerRegistration.jsx - Dietary preferences form for consumers
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ConsumerRegistration() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    lactoseFree: false,
    glutenFree: false,
    vegetarian: false,
    vegan: false,
    nutAllergy: false,
    shellfishAllergy: false,
    halal: false,
    kosher: false,
    lowCholesterol: false,
    lowSugar: false,
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
      if (parsedData.userType !== "consumer") {
        // Redirect to user type selection if not a consumer
        navigate("/select-user-type");
      }
    }
  }, [navigate]);

  const handleToggle = (preference) => {
    setPreferences({
      ...preferences,
      [preference]: !preferences[preference],
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
        preferences: preferences,
      };

      // DEVELOPMENT MODE: For testing without backend
      // Remove this block when backend is ready with CORS
      console.log("Registration data that would be sent:", completeData);

      // Simulate a successful API response
      setTimeout(() => {
        // Clear session storage after successful registration
        sessionStorage.removeItem("registrationData");

        // Navigate to the login page after successful registration
        navigate("/login");
        setIsLoading(false);
      }, 1500);

      return;

      // PRODUCTION MODE: Uncomment this when backend is ready
      /*
      // Send registration request
      const response = await axios.post(
        `${baseUrl}/auth/register/consumer`, 
        completeData,
        { headers: { 'Content-Type': 'application/json' } }
      )

      // Check if registration was successful
      if (response.data === 'Consumer registered successfully' || response.status === 200) {
        // Clear session storage after successful registration
        sessionStorage.removeItem('registrationData')
        
        // Navigate to the login page after successful registration
        navigate('/login')
      } else {
        // Handle unexpected response
        throw new Error('Registration failed with an unexpected response')
      }
      */
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

  const handleSkip = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Get the registration data from session storage
      const registrationData = JSON.parse(
        sessionStorage.getItem("registrationData") || "{}"
      );

      // Create registration data without preferences
      const completeData = {
        name: registrationData.fullName,
        email: registrationData.email,
        password: registrationData.password,
        contactNumber: registrationData.contactNumber,
        preferences: {},
      };

      // DEVELOPMENT MODE: For testing without backend
      // Remove this block when backend is ready with CORS
      console.log("Registration data that would be sent:", completeData);

      // Simulate a successful API response
      setTimeout(() => {
        // Clear session storage after successful registration
        sessionStorage.removeItem("registrationData");

        // Navigate to the login page after successful registration
        navigate("/login");
        setIsLoading(false);
      }, 1500);

      return;

      // PRODUCTION MODE: Uncomment this when backend is ready
      /*
      // Send registration request
      const response = await axios.post(
        `${baseUrl}/auth/register/consumer`, 
        completeData,
        { headers: { 'Content-Type': 'application/json' } }
      )

      // Check if registration was successful
      if (response.data === 'Consumer registered successfully' || response.status === 200) {
        // Clear session storage after successful registration
        sessionStorage.removeItem('registrationData')
        
        // Navigate to the login page after successful registration
        navigate('/login')
      } else {
        // Handle unexpected response
        throw new Error('Registration failed with an unexpected response')
      }
      */
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
            Dietary Preferences
          </h1>
          <p className="text-green-500 mt-2">
            Help us customize your experience by telling us about your dietary
            preferences
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div
              className={`p-3 border rounded-lg cursor-pointer ${
                preferences.lactoseFree
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleToggle("lactoseFree")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.lactoseFree}
                  onChange={() => {}} // Handle change above, just to make checkbox controlled
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-green-700">Lactose Free</label>
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg cursor-pointer ${
                preferences.glutenFree
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleToggle("glutenFree")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.glutenFree}
                  onChange={() => {}}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-green-700">Gluten Free</label>
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg cursor-pointer ${
                preferences.vegetarian
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleToggle("vegetarian")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.vegetarian}
                  onChange={() => {}}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-green-700">Vegetarian</label>
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg cursor-pointer ${
                preferences.vegan
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleToggle("vegan")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.vegan}
                  onChange={() => {}}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-green-700">Vegan</label>
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg cursor-pointer ${
                preferences.nutAllergy
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleToggle("nutAllergy")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.nutAllergy}
                  onChange={() => {}}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-green-700">Nut Allergy</label>
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg cursor-pointer ${
                preferences.shellfishAllergy
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleToggle("shellfishAllergy")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.shellfishAllergy}
                  onChange={() => {}}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-green-700">Shellfish Allergy</label>
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg cursor-pointer ${
                preferences.halal
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleToggle("halal")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.halal}
                  onChange={() => {}}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-green-700">Halal</label>
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg cursor-pointer ${
                preferences.kosher
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleToggle("kosher")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.kosher}
                  onChange={() => {}}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-green-700">Kosher</label>
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg cursor-pointer ${
                preferences.lowCholesterol
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleToggle("lowCholesterol")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.lowCholesterol}
                  onChange={() => {}}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-green-700">Low Cholesterol</label>
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg cursor-pointer ${
                preferences.lowSugar
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleToggle("lowSugar")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.lowSugar}
                  onChange={() => {}}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-green-700">Low Sugar</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={handleSkip}
              className={`py-2 px-4 border border-green-500 text-green-600 rounded hover:bg-green-50 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Skip for now"}
            </button>
            <button
              type="submit"
              className={`py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConsumerRegistration;
