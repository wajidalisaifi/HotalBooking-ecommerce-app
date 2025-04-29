import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import Navbar from './common/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import Registration from './auth/Registration';
import AllRoomPage from './Booking_Room/AllRoomPage';
import { ProtectedRoute } from './service/guard';
import RoomDetailsPage from './Booking_Room/RoomDetailsPage';
import ProfilePage from './profile/ProfilePage';
import EditProfilePage from './profile/EditProfilePage';



function App() {
  return (
    <BrowserRouter>

      <div className='App'>
        <Navbar />

        <Routes >
          
          <Route exect path='/Home' element={<Home/>} />
          <Route exect path='/Login' element={<LoginPage/>}/>
          <Route path='/Registration' element={<Registration/>} />
          <Route path='/Room' element= {<AllRoomPage/>} />

          <Route path='/room-details-book/:roomId'
          element = {<ProtectedRoute element = {<RoomDetailsPage/>}/> } />

         <Route path='/profile'
         element = {<ProtectedRoute element={<ProfilePage/>} />}/>

         <Route path='edit-profile'
         element= {<ProtectedRoute element={<EditProfilePage/>} />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
