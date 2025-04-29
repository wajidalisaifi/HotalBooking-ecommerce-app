import axios, { Axios } from "axios"
import { useId } from "react";


export default class ApiService {
  static base_url = "http://localhost:4040"

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };
  }

  static async Api(Register) {
    const regiData = await axios.post(`${this.base_url}/auth/register`, Register)
    return regiData.data

  }

  static async setLogin(logindata) {
    const response = await axios.post(`${this.base_url}/auth/login`, logindata)
    return response.data
  }

  static async getAllRoom() {
    const response = await axios.get(`${this.base_url}/rooms/all`)
    return response.data
  }

  static async getRoomByType() {
    const response = await axios.get(`${this.base_url}/rooms/types`)
    return response.data
  }

  static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
    const result = await axios.get(
      `${this.base_url}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}
&checkOutDate=${checkOutDate}&roomType=${roomType}`
    )
    return result.data
  }


  static async getRoomById(roomId) {
    const result = await axios.get(`${this.base_url}/rooms/room-by-id/${roomId}`)
    return result.data;
  }

  static async getUserProfile() {

    const response = await axios.get(`${this.base_url}/users/get-logged-in-profile-info`, {
      headers: this.getHeader()
    })

    return response.data
  }


  static async bookRoom(roomId, userId, booking) {

    console.log("USER ID IS: " + userId)


    const response = await axios.post(`${this.base_url}/bookings/book-room/${roomId}/${userId}`, booking, {
      headers: this.getHeader()
    })
    return response.data

  }

  // static async getUserProfile(){
  //   alert("user profile ApiService")
  //   const response = await axios.get(`${this.base_url}/users/get-logged-in-profile-info`,{
  //     headers: this.getHeader()
  //   } )
  //   return response.data
  // }

  static async getUserBookings(userId) {
    const response = await axios.get(`${this.base_url}/users/get-user-bookings/${userId}`, {
      headers: this.getHeader()
    })
    return response.data
  }
  
  static async deleteUser(userId) {
    const response = await axios.delete(`${this.base_url}/users/delete/${userId}`, {
        headers: this.getHeader()
    })
    return response.data
}











  static isAdmin() {
    const role = localStorage.getItem('role')
    return role === 'ADMIN'
  }

  static isAuthenticated() {
    const token = localStorage.getItem('token')
    return !!token
  }

  static isAdmin() {
    const role = localStorage.getItem('role')
    return role === 'ADMIN'
  }

  static isUser() {
    const role = localStorage.getItem('role')
    return role === 'USER'
  }

  static logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }



}
