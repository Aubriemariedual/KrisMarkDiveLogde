import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

const BookRooms = () => {
  const [bookings, setBookings] = useState([]); // State to store all bookings
  const [filteredBookings, setFilteredBookings] = useState([]); // State to store filtered bookings
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filter, setFilter] = useState("all"); // State for filter (e.g., by room type)
  const [selectedBooking, setSelectedBooking] = useState(null); // State to store the selected booking for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State to control payment modal visibility
  const [isLoading, setIsLoading] = useState(true); // State to indicate loading
  const [paymentDetails, setPaymentDetails] = useState({
    billingName: "",
    billingAddress: "",
    paymentMethod: "cash", // Default to cash
    gcashNumber: "", // Only required if paymentMethod is gcash
  });

  // Fetch bookings from Firestore
  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      // Fetch bookings
      const bookingsQuerySnapshot = await getDocs(collection(db, "bookings"));
      const bookingsData = bookingsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(bookingsData);
      setFilteredBookings(bookingsData); // Initialize filtered bookings
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle search query changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterBookings(query, filter);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    filterBookings(searchQuery, selectedFilter);
  };

  // Filter bookings based on search query and filter
  const filterBookings = (query, filter) => {
    let filtered = bookings.filter((booking) => {
      const matchesSearch =
        booking.roomDetails?.name.toLowerCase().includes(query) ||
        booking.guestInfo.firstName.toLowerCase().includes(query) ||
        booking.guestInfo.lastName.toLowerCase().includes(query) ||
        booking.guestInfo.email.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" || booking.roomDetails?.name === filter;

      return matchesSearch && matchesFilter;
    });
    setFilteredBookings(filtered);
  };

  // Handle Check-out button click
  const handleCheckOutClick = (id) => {
    setSelectedBooking(id);
    setIsPaymentModalOpen(true); // Open payment modal
  };

  // Handle payment form input changes
  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate the number of days stayed
  const calculateDaysStayed = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut - checkIn;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  // Calculate the total amount
  const calculateTotalAmount = (roomRate, daysStayed) => {
    return roomRate * daysStayed;
  };

  // Handle payment form submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the booking data
      const bookingRef = doc(db, "bookings", selectedBooking);
      const bookingSnapshot = await getDoc(bookingRef);
      const bookingData = bookingSnapshot.data();

      // Calculate billing details
      const daysStayed = calculateDaysStayed(bookingData.checkInDate, bookingData.checkOutDate);
      const totalAmount = calculateTotalAmount(bookingData.roomDetails?.ratePerDay || 0, daysStayed);

      // Add the booking data to the bookingHistory collection with payment details
      await addDoc(collection(db, "bookingHistory"), {
        ...bookingData,
        checkOutTimestamp: new Date(), // Add a timestamp for when the check-out occurred
        paymentDetails: {
          ...paymentDetails,
          daysStayed,
          totalAmount,
        },
      });

      // Delete the booking from the bookings collection
      await deleteDoc(bookingRef);

      alert("Check-out and payment successful!");
      fetchBookings(); // Refresh the list of bookings
      setIsPaymentModalOpen(false); // Close payment modal
      setPaymentDetails({
        billingName: "",
        billingAddress: "",
        paymentMethod: "cash",
        gcashNumber: "",
      }); // Reset payment details
    } catch (error) {
      console.error("Error during check-out and payment: ", error);
      alert("Failed to complete check-out and payment. Please try again.");
    }
  };

  // Open modal with booking details
  const openModal = (booking) => {
    setSelectedBooking(booking.id);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // Get the selected booking for the payment modal
  const selectedBookingData = filteredBookings.find((b) => b.id === selectedBooking);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Manage Bookings</h1>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by room, guest name, or email..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filter}
          onChange={handleFilterChange}
          className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Rooms</option>
          {Array.from(new Set(bookings.map((booking) => booking.roomDetails?.name))).map((roomName) => (
            <option key={roomName} value={roomName}>
              {roomName}
            </option>
          ))}
        </select>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left text-gray-700 font-semibold">Room</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Check-in</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Check-out</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Guests</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Guest Name</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Email</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-600">
                  Loading...
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-600">
                  No bookings found.
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => openModal(booking)}
                >
                  <td className="p-4 text-gray-700">{booking.roomDetails?.name}</td>
                  <td className="p-4 text-gray-700">{booking.checkInDate}</td>
                  <td className="p-4 text-gray-700">{booking.checkOutDate}</td>
                  <td className="p-4 text-gray-700">{booking.numberOfGuests}</td>
                  <td className="p-4 text-gray-700">
                    {booking.guestInfo.firstName} {booking.guestInfo.lastName}
                  </td>
                  <td className="p-4 text-gray-700">{booking.guestInfo.email}</td>
                  <td className="p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click event
                        handleCheckOutClick(booking.id);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Check-out
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Full Details */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking Details</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-semibold">Room:</span>{" "}
                {filteredBookings.find((b) => b.id === selectedBooking)?.roomDetails?.name}
              </p>
              <p>
                <span className="font-semibold">Check-in:</span>{" "}
                {filteredBookings.find((b) => b.id === selectedBooking)?.checkInDate}
              </p>
              <p>
                <span className="font-semibold">Check-out:</span>{" "}
                {filteredBookings.find((b) => b.id === selectedBooking)?.checkOutDate}
              </p>
              <p>
                <span className="font-semibold">Number of Guests:</span>{" "}
                {filteredBookings.find((b) => b.id === selectedBooking)?.numberOfGuests}
              </p>
              <p>
                <span className="font-semibold">Guest Name:</span>{" "}
                {filteredBookings.find((b) => b.id === selectedBooking)?.guestInfo.firstName}{" "}
                {filteredBookings.find((b) => b.id === selectedBooking)?.guestInfo.lastName}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {filteredBookings.find((b) => b.id === selectedBooking)?.guestInfo.email}
              </p>
              <p>
                <span className="font-semibold">Mobile Number:</span>{" "}
                {filteredBookings.find((b) => b.id === selectedBooking)?.guestInfo.mobileNumber}
              </p>
              <p>
                <span className="font-semibold">Gender:</span>{" "}
                {filteredBookings.find((b) => b.id === selectedBooking)?.guestInfo.gender}
              </p>
              <p>
                <span className="font-semibold">Special Request:</span>{" "}
                {filteredBookings.find((b) => b.id === selectedBooking)?.guestInfo.specialRequest}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedBookingData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h2>
            <form onSubmit={handlePaymentSubmit}>
              <div className="space-y-4">
                {/* Room Rate, Days Stayed, and Total Cost */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Billing Summary</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Room Rate:</span>{" "}
                      ₱{selectedBookingData.roomDetails?.ratePerDay} per day
                    </p>
                    <p>
                      <span className="font-semibold">Days Stayed:</span>{" "}
                      {calculateDaysStayed(selectedBookingData.checkInDate, selectedBookingData.checkOutDate)} days
                    </p>
                    <p>
                      <span className="font-semibold">Total Cost:</span>{" "}
                      ₱{calculateTotalAmount(
                        selectedBookingData.roomDetails?.ratePerDay,
                        calculateDaysStayed(selectedBookingData.checkInDate, selectedBookingData.checkOutDate)
                      )}
                    </p>
                  </div>
                </div>

                {/* Payment Form */}
                <div>
                  <label className="block text-gray-700 font-semibold">Billing Name</label>
                  <input
                    type="text"
                    name="billingName"
                    value={paymentDetails.billingName}
                    onChange={handlePaymentInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Billing Address</label>
                  <input
                    type="text"
                    name="billingAddress"
                    value={paymentDetails.billingAddress}
                    onChange={handlePaymentInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={paymentDetails.paymentMethod}
                    onChange={handlePaymentInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cash">Cash</option>
                    <option value="gcash">GCash</option>
                  </select>
                </div>
                {paymentDetails.paymentMethod === "gcash" && (
                  <div>
                    <label className="block text-gray-700 font-semibold">GCash Number</label>
                    <input
                      type="text"
                      name="gcashNumber"
                      value={paymentDetails.gcashNumber}
                      onChange={handlePaymentInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookRooms;