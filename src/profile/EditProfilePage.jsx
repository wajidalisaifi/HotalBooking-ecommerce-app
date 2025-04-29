import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import ApiService from "../service/ApiService"
import AllRoomPage from "../Booking_Room/AllRoomPage"

const EditProfilePage = () => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile()
                setUser(response.user)
            }
            catch (error) {
                alert(error)
                setError(error.response?.data?.message || error.message)
            }
        }
        fetchUserProfile();
    }, [])

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        try {
            
            await ApiService.deleteUser(user.id);
            navigate('/Registration');
        } catch (error) {
            alert(error.message)
            setError(error.message);
        }
    };


    return (
        <div className="edit-profile-page">
            <h2>Edit Profile</h2>
            {user && (
                <div className="profile-details">
                    <div><strong>Name:  </strong> {user.name} </div>
                    <div><strong>Email:  </strong>{user.email}</div>
                    <div><strong>Phone:  </strong>{user.phone}</div>
                    <button className="delete-profile-button" onClick={handleDeleteProfile}>delete Profile</button>
                </div>

            )}

        </div>
    )

}
export default EditProfilePage;