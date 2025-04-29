import { useEffect, useId, useState } from "react";
import DatePicker from "react-datepicker";
import { useFormState } from "react-dom";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { alwaysValidSchema } from "ajv/dist/compile/util";

const RoomDetailsPage = () => {

    const navigate = useNavigate();
    const { roomId } = useParams();
    const [userId, setUserId] = useState('');
    let [showDatePicker, setShowDatePicker] = useState(false)
    let [checkInDate, setCheckInDate] = useState(null)
    let [CheckOutDate, setCheckOutDate] = useState(null)
    let [adult, setAdult] = useState(null)
    let [child, setChild] = useState(null)
    let [errorMasage, setErrorMassage] = useState(null)
    let [totalPrice, setTotalPrice] = useState(null)
    let [totalGuest, setTotalGuest] = useState(null)
    const [roomDetails, setRoomDetails] = useState(null);
    const [loding, setLoding] = useState(true)
    const [confirmationCode, setConfirmationCode] = useState('');
    const [showMessage, setShowMessage] = useState(false);



    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoding(true)
                const response = await ApiService.getRoomById(roomId);
                setRoomDetails(response.room);
                const userProfile = await ApiService.getUserProfile();
                setUserId(userProfile.user.id)
            }
            catch (error) {

                setErrorMassage(error.response?.data?.message || error.message)
            }
            finally {
                setLoding(false)
            }
        }
        fetchData();
    }, [roomId])


    let handleConfirmBooking = async () => {
        if (!checkInDate || !CheckOutDate) {
            setErrorMassage("Please select check-in and check-out dates.")
            setTimeout(() => setErrorMassage(''), 5000);
            return;
        }
        if (isNaN(adult) || adult < 1 || isNaN(child) || child < 0) {
            setErrorMassage('Please enter valid numbers for adults and children.');
            setTimeout(() => setErrorMassage(''), 5000); // Clear error message after 5 seconds
            return;
        }

        const oneDay = 24 * 60 * 60 * 1000;  // one day in  milisecond
        const startDate = new Date(checkInDate) //2-4-2025  converet  web apr 2025 
        const endDate = new Date(CheckOutDate)
        const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;
        const totalGuests = adult + child;

        const roomPricePerNight = roomDetails.roomPrice;
        const totalPrices = roomPricePerNight * totalDays;

        setTotalGuest(totalGuests);
        setTotalPrice(totalPrices)
    }


    const acceptBooking = async () => {
        try {

            const startDate = new Date(checkInDate);
            const endDate = new Date(CheckOutDate);

            const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

            const booking = {
                checkInDate: formattedCheckInDate,
                checkOutDate: formattedCheckOutDate,
                numOfAdults: adult,
                numOfChildren: child
            };

            const response = await ApiService.bookRoom(roomId, userId, booking);
            if (response.statusCode === 200) {
                setConfirmationCode(response.bookingConfirmationCode);

                setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false)
                    navigate('/Room');
                }, 10000);
            }
        } catch (error) {
            setErrorMassage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMassage(''), 5000);
        }
    };

    if (loding) {
        return <p className='room-detail-loading'>Loading room details...</p>;
    }


    if (!roomDetails) {
        return <p className='room-detail-loading'>Room not found.</p>;
    }

    const { roomType, roomPrice, description, bookings } = roomDetails;




    return (

        <div className="room-details-booking">

            {showMessage && (
                <p className="booking-success-message">
                    Booking successful! Confirmation code: {confirmationCode}. An SMS and email of your booking details have been sent to you.
                </p>
            )}

            {errorMasage && (
                <p className="error-message">
                    {errorMasage}
                </p>
            )}

            <h2>Room Details</h2>
            <button className="book-now-button" onClick={() => setShowDatePicker(true)}>  Book Now </button>
            <button className="book-now-button" onClick={() => setShowDatePicker(false)}>go back</button>

            {showDatePicker && (
                <div className="date-picker-container">

                    <DatePicker
                        selectsStart
                        className="detail-search-field"
                        startDate={checkInDate}
                        endDate={CheckOutDate}
                        selected={checkInDate}
                        onChange={(date) => setCheckInDate(date)}
                        dateFormat={"dd/MM/yyyy"}
                        placeholderText="Check In Date"
                    />

                    <DatePicker
                        selected={CheckOutDate}
                        onChange={(date) => setCheckOutDate(date)}
                        placeholderText="check Out Date"
                        selectsEnd
                        dateFormat={"dd/MM/yyyy"}
                        className="detail-search-field"
                        startDate={checkInDate}
                        endDate={CheckOutDate}
                        minDate={checkInDate}
                    />

                    <div className="guest-container">
                        <div className="guest-div">
                            <label>Adult</label>

                            <input
                                type="number"
                                value={adult}
                                onChange={(e) => setAdult(parseInt(e.target.value))}
                                min={1}
                            />

                            <label htmlFor="">Number Of Child</label>
                            <input
                                type="number"
                                value={child}
                                onChange={(e) => setChild(parseInt(e.target.value))}
                                min={0}
                            />
                        </div>
                        <button className="confirm-booking" onClick={handleConfirmBooking}>Conferm booking</button>
                    </div>
                </div>
            )
            }
            {
                totalPrice > 0 && (
                    <div className="total-price">
                        <p>Total Price: {totalPrice}</p>
                        <p>Total Guest:{totalGuest}</p>
                        <button onClick={acceptBooking} className="accept-booking">Accept Booking</button>
                    </div>
                )
            }
        </div>
    )

}
export default RoomDetailsPage;