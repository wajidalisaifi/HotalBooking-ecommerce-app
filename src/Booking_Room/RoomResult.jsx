import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";


const RoomResult = ({ roomSearchResults }) => {

    const navigate = useNavigate();
    const isAdmin = ApiService.isAdmin();

    return (
        <section className="room-results">
            {
                roomSearchResults && roomSearchResults.length > 0 && (
                    <div className="room-list">
                        {roomSearchResults.map(room => (
                            <div key={room.id} className="room-list-item">
                                <img className="room-list-item-image" src="assets/img.png" alt="" />
                                {/* <img className='room-list-item-image' src={room.roomPhotoUrl} alt={room.roomType} /> */}
                                <div className="room-details">
                                    <h3>{room.roomType}</h3>
                                    <p>Price: ${room.roomPrice} / night</p>
                                    <p>Description: {room.roomDescription}</p>
                                </div>
                                <div className='book-now-div'>
                                    {isAdmin ?
                                    
                                    <button>
                                        Edit Room
                                    </button>
                                    :(
                                        <button
                                        className="book-now-button"
                                         onClick={()=> navigate(`/room-details-book/${room.id}`)  }>
                                        
                                        View/Book Now</button>
                                    )
                                }
                                </div>
                            </div>
                        ))}
                    </div>

                )
            }
        </section>
    )
}
export default RoomResult;