import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // Store tokens in localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Decode JWT to get role information
      const payload = JSON.parse(atob(data.accessToken.split(".")[1]));
      const userRole = payload.role[0].authority;

      // Navigate based on user role
      if (userRole === "ROLE_RESTAURANT") {
        navigate("/restaurants");
      } else if (userRole === "ROLE_FARMER") {
        navigate("/farmers");
      } else {
        // Default to customer dashboard
        navigate("/customer");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md text-center">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-green-600">Green Plate</h1>
          <p className="text-green-500 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mx-6 p-3 bg-red-100 text-red-700 rounded border border-red-200 mb-4">
            {error}
          </div>
        )}

        <form className="p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-green-600 mb-2 text-left"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-green-300 rounded bg-white text-green-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              className="w-full p-2 border border-green-300 rounded bg-white text-green-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6 text-right">
            <Link
              to="/forgot-password"
              className="text-green-600 text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full ${
              loading ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
            } text-white py-2 px-4 rounded mb-4`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="mt-4 text-center">
            <p className="text-green-700">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
