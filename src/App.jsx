import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Admin/Register";
import AdminHome from "./Admin/AdminHome";
import ProtectedRoutes from "./ProtectedRoutes";
import Admin from "./Admin/Admin";
import AdminRoomManagement from "./Admin/AdminRoomManagement";
import Staff from "./StaffSide/Staff";
import Home from "./StaffSide/Home";
import RoomAvailability from "./StaffSide/RoomAvailability";
import BookingForm from "./StaffSide/BookingForm";
import BookRooms from "./StaffSide/BookRooms";
import BookHistory from "./StaffSide/BookHistory";
import Report from "./StaffSide/Report";
import Reports from "./Admin/Reports";
import ComplaintReportForm from "./ComplaintReportForm";
import ReportsTable from "./Admin/ReportsTable";
import Settings from "./StaffSide/Settings";
import AdminSetting from "./Admin/AdminSettings";
import PublicHome from "./PublicPage/PublicHome";
import PublicBooking from "./PublicPage/PublicBooking";
import ForgotPassword from "./ForgotPassword";
import StaffForm from "./Admin/StaffForm";
import OnlineBookings from "./StaffSide/OnlineBookings";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to /public-home */}
        <Route path="/" element={<Navigate to="/public-home" replace />} />

        {/* Public Routes */}
        <Route path="/public-home" element={<PublicHome />} />
        <Route path="/public-booking" element={<PublicBooking />} />
        <Route path="/Report" element={<ComplaintReportForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin-home"
          element={
            <ProtectedRoutes requiredRole="admin">
              <Admin />
            </ProtectedRoutes>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="room-management" element={<AdminRoomManagement />} />
          <Route path="complaints" element={<ReportsTable />} />
          <Route path="admin-rooms-availability" element={<RoomAvailability />} />
          <Route path="create-user" element={<StaffForm />} />
          <Route path="reports" element={<Reports />} />
          <Route path="setting" element={<AdminSetting />} />
        </Route>

        {/* Staff Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoutes requiredRole="staff">
              <Staff />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Home />} />
          <Route path="rooms-availability" element={<RoomAvailability />} />
          <Route path="rooms-availability/booking-form" element={<BookingForm />} />
          <Route path="book-rooms" element={<BookRooms />} />
          <Route path="online-bookings" element={<OnlineBookings />} />
          <Route path="book-history" element={<BookHistory />} />
          <Route path="report" element={<Report />} />
          <Route path="setting" element={<Settings />} />
        </Route>

        {/* Default Redirect to Public Home */}
        <Route path="*" element={<Navigate to="/public-home" replace />} />
      </Routes>
    </Router>
  );
};

export default App;