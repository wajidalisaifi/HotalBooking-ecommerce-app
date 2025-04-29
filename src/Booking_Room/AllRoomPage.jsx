import React, { useEffect, useState } from 'react'
import ApiService from '../service/ApiService';
import RoomSearch from './RoomSearch';
import RoomResult from './RoomResult';
import Pagination from './Pagination';

export default function AllRoomPage() {

    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(2);


    const handleSearchResult = (results) => {
        //  setRooms(results);
        setFilteredRooms(results);
    };

    useEffect(() => {

        const fetchRoom = async () => {
            try {
                const response = await ApiService.getAllRoom();
                const allRoom = response.roomList
                setRooms(allRoom)
                setFilteredRooms(allRoom)
            }
            catch (error) {
                console.log("Error fetching rooms:  " + error.massage)
            }
        }

        const fetchRoomType = async () => {
            try {
                const roomType = await ApiService.getRoomByType()
                setRoomTypes(roomType)
            }
            catch (error) {
                console.log(error.massage)
            }
        }

        fetchRoom();
        fetchRoomType();
    }, [])

    const handeRoomTypeChange = (e) => {

        setSelectedRoomType(e.target.value)
        fillterRooms(e.target.value)
    }
    let fillterRooms = (type) => {
        if (type === '') {
            setFilteredRooms(rooms)
            return
        }
        const filtered = rooms.filter((room) => room.roomType === type);
        setFilteredRooms(filtered);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;

    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;

    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
   
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <div className='all-rooms'>
            <h2>All Rooms</h2>
            <div className='all-room-filter-div'>

                <label>Filter by Room Type: </label>

                <select value={selectedRoomType} onChange={handeRoomTypeChange}>
                    <option value="">All</option>

                    {roomTypes.map((types) =>
                        <option key={types} value={types}>
                            {types}
                        </option>
                    )}

                </select>
            </div>

            <RoomSearch handleSearchResult={handleSearchResult} />
            <RoomResult roomSearchResults={currentRooms} />
            <Pagination
                roomsPerPage={roomsPerPage}
                totalRooms={filteredRooms.length}
                currentPage={currentPage}
                paginate={paginate}
            />

        </div>
    )
}
