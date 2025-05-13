import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/login";
import Customer from "./Customer/Customer";
import Signup from "./Signup/Signup";
import ForgotPassword from "./components/forgotPassword";
import Checkout from "./components/checkout";
import UserTypeSelection from "./Registration/selectusertype";
import ConsumerRegistration from "./Registration/Consumer";
import RestaurantRegistration from "./Registration/Restaurant";
import FarmerRegistration from "./Registration/Farmers";
import CartPage from "./Cart/cartPage";
import RestaurantDashboard from "./Restaurants/Restaurant";
import FarmerDashboard from "./Farmers/Farmers";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Registration Flow */}
        <Route path="/select-user-type" element={<UserTypeSelection />} />
        <Route path="/register/consumer" element={<ConsumerRegistration />} />
        <Route path="/register/restaurant" element={<RestaurantRegistration />} />
        <Route path="/register/farmer" element={<FarmerRegistration />} />
        
        {/* Main App Routes */}
        <Route path="/customer" element={<Customer />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/restaurants" element={<RestaurantDashboard />} />
        <Route path="/farmers" element={<FarmerDashboard />} />
        
        {/* Other user type dashboards would go here */}
      </Routes>
    </BrowserRouter>
  )
}


