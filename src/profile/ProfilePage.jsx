import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";



const ProfilePage = () => {

    let [user, setUser] = useState(null)
    let [error, setError] = useState(null)
    const navigate = useNavigate();


    useEffect(() => {
        const fetchingUserProfile = async () => {

            try {
                const response = await ApiService.getUserProfile();
                const userPlusBooking = await ApiService.getUserBookings(response.user.id)
                setUser(userPlusBooking.user)
            }
            catch (error) {
                alert(error)
                setError(error.response?.data?.message || error.message)
            }
        }
        fetchingUserProfile();
    }, [])

    const  handleEditProfile = () => {
        navigate("/edit-profile")
    }

    const handleLogout = () => {
        ApiService.handleLogout();
        navigate("/Home")
    }




    return (

        <div className="profile-page">
            {user && <h2>Welcome, {user.name}</h2>}
            <div className="profile-actions">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <button className="profile-actions" onClick={handleEditProfile}>Edit Profile</button>
            </div>
            {error && <p>error-message: {error}</p>}
            {user && (
                <div className="profile-details">
                    <h3>My Profile Detail</h3>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Phone Number: </strong>{user.phone}</p>
                </div>
            )}

<div className="bookings-section">
                <h3>My Booking History</h3>
                <div className="booking-list">
                    {user && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div key={booking.id} className="booking-item">
                                <p><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                                <p><strong>Check-in Date:</strong> {booking.checkInDate}</p>
                                <p><strong>Check-out Date:</strong> {booking.checkOutDate}</p>
                                <p><strong>Total Guests:</strong> {booking.totalNumOfGuest}</p>
                                <p><strong>Room Type:</strong> {booking.room.roomType}</p>
                                {/* <img src={booking.room.roomPhotoUrl} alt="Room" className="room-photo" /> */}
                            </div>
                        ))
                    ) : (
                        <p>No bookings found.</p>
                    )}
                </div>
            </div>

        </div>
    )
}
export default ProfilePage;