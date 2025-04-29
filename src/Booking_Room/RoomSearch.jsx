import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import ApiService from '../service/ApiService'


export default function RoomSearch({handleSearchResult}) {

  let [startDate, setStartDate] = useState(null)
  let [endDate, setEndDate] = useState(null)
  let [roomTypes, setRoomTypes] = useState([])
  let [error, setError] = useState(null)
  const [roomType, setRoomType] = useState('');


  useEffect(() => {

    const fetchRoomType = async () => {
      try {
        const type = await ApiService.getRoomByType();
        setRoomTypes(type)
      }
      catch (error) {
        console.log(error.massage)
      }
    }
    fetchRoomType();
  }, [])

  let showError = (massage, timeout = 5000) => {
    setError(massage)
    setTimeout(() => {
      setError('')
    }, timeout);
  }

  let handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType) {
      showError('Please select all fields')
      return false
    }

    try {
      const formatedDate = startDate ? startDate.toISOString().split('T')[0] : null
      const formatedEndDate = endDate ? endDate.toISOString().split('T')[0] : null

      const responseDate = await ApiService.getAvailableRoomsByDateAndType(formatedDate, formatedEndDate, roomType);
    
      if (responseDate.statusCode === 200) {
        if (responseDate.roomList.lenth === 0) {
          showError("Room not currently available for this date range on the selected room type.")
          return
        }
        handleSearchResult(responseDate.roomList)
        showError('')
      }
    }
    catch (error) {
      showError("Unown error occured: " + error.message);
    }
  }
  
  return (
    <section>

      <div className='search-container'>

        <div className='search-field'>
          <label>Check in date</label>
          < DatePicker
            selected={startDate}
            placeholderText='Select Check-in Date'
            dateFormat={"dd/MM/yyyy"}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className='search-field'>
          <label>Check out date</label>
          <DatePicker
            selected={endDate}
            placeholderText='selected check out date'
            onChange={(date) => setEndDate(date)}
            dateFormat={"dd/MM/yyyy"}
          />
        </div>

        <div className='search-field'>
          <label>Room Type</label>

          <select value={roomType} onChange={(e) => setRoomType(e.target.value)} >
            <option>Select Room Type</option>
            {
              roomTypes.map(
                (room) =>
                  <option key={room} value={room}>
                    {room}
                  </option>
              )
            }
          </select>
        </div>

        <button className="home-search-button" onClick={handleInternalSearch}>
          Search Rooms
        </button>

      </div>
      {error && <p className="error-message">{error}</p>}
    </section>

  )
}
