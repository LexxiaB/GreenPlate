import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserTypeSelection() {
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if registration data exists in session storage
  useEffect(() => {
    const registrationData = sessionStorage.getItem("registrationData");
    if (!registrationData) {
      // Redirect to signup if no registration data exists
      navigate("/signup");
    }
  }, [navigate]);

  const handleContinue = () => {
    if (!userType) return;

    setIsLoading(true);

    try {
      // Get the registration data from session storage
      const registrationData = JSON.parse(
        sessionStorage.getItem("registrationData") || "{}"
      );

      // Add the user type to the registration data
      const updatedData = {
        ...registrationData,
        userType,
      };

      // Update session storage with the user type information
      sessionStorage.setItem("registrationData", JSON.stringify(updatedData));

      // Navigate to the appropriate registration form based on user type
      switch (userType) {
        case "consumer":
          navigate("/register/consumer");
          break;
        case "restaurant":
          navigate("/register/restaurant");
          break;
        case "farmer":
          navigate("/register/farmer");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error processing user type selection:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-600">
            Welcome to Green Plate
          </h1>
          <p className="text-green-500 mt-2">Tell us who you are</p>
        </div>

        <div className="space-y-4 mb-8">
          <div
            className={`p-4 border rounded-lg cursor-pointer ${
              userType === "consumer"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-300"
            }`}
            onClick={() => setUserType("consumer")}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border ${
                  userType === "consumer"
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300"
                }`}
              >
                {userType === "consumer" && (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-green-700">Consumer</h3>
                <p className="text-sm text-green-600">
                  I want to order food and support local businesses
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 border rounded-lg cursor-pointer ${
              userType === "restaurant"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-300"
            }`}
            onClick={() => setUserType("restaurant")}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border ${
                  userType === "restaurant"
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300"
                }`}
              >
                {userType === "restaurant" && (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-green-700">Restaurant</h3>
                <p className="text-sm text-green-600">
                  I want to list my restaurant on Green Plate
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 border rounded-lg cursor-pointer ${
              userType === "farmer"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-300"
            }`}
            onClick={() => setUserType("farmer")}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border ${
                  userType === "farmer"
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300"
                }`}
              >
                {userType === "farmer" && (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-green-700">Farmer</h3>
                <p className="text-sm text-green-600">
                  I want to sell my produce on Green Plate
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!userType || isLoading}
          className={`w-full py-2 px-4 rounded font-medium ${
            userType && !isLoading
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Processing..." : "Continue"}
        </button>
      </div>
    </div>
  );
}

export default UserTypeSelection;
