import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPages";
import SignupPage from "./pages/login/SignupPage";
import Dashboard from "./pages/dashboard/Dashboard";
import { useSelector } from "react-redux";
import UserPage from "./pages/user/UserPage";
import BookingPage from "./pages/Slotbook/BookingPage";
import BookReservationsPage from "./pages/Slotbook/BookReservations";

function App() {
  const token = useSelector((state) => state.token);
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className="container h-full w-full">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Reservations"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Reservations/add"
          element={
            <ProtectedRoute>
              <BookReservationsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
