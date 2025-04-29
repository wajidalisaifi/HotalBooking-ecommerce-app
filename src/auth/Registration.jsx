import React, { useState } from 'react';
import './Registration.css';
import ApiService from '../service/ApiService';
import { Navigate, useNavigate } from 'react-router-dom';
import RoomSearch from '../Booking_Room/RoomSearch';

export default function Registration() {

    let navigate = useNavigate();

    let [data, setData] = useState(
        {
            "name": "",
            "email": "",
            "phone": "",
            "password": ""
        }
    )
    let [errorMassage, setErrorMassage] = useState(null)
    let [succesfulMassage, setSuccessfulMassage] = useState(null)

    let change = (event) => {
        let {name,value} = event.target;
        setData({...data,[name]:value})

        // let oldData = { ...data }
        // let inputName = event.target.name
        // let inputValue = event.target.value
        // oldData[inputName] = inputValue
        // setData(oldData)
    }

    let validation = () => {
        let { name, email, phone, password } = data
        if (!name || !email || !phone || !password) {
            return false
        }
        return true
    }

    let saveData = async (e) => {
        e.preventDefault();
        if (!validation()) {
            setErrorMassage("Please fill all the fields.") 
            setTimeout(()=> setErrorMassage(''),1000)
            return;
        }

        try{
            const response = await ApiService.Api(data)
            if(response.statusCode == 200){

                setData(
                    {
                        "name": "",
                        "email": "",
                        "phone": "",
                        "password": ""
                    }
                )

                setSuccessfulMassage("User registered successfully")

                setTimeout(()=>
                {
                setSuccessfulMassage('');
                navigate('/Home')
                },3000
                )
            }
        }
        catch(error){
            setErrorMassage(error.response?.data?.message || error.massage )
            setTimeout(()=>
            setErrorMassage(''),5000
            )
        }
    }



    return (
        <div className='container'>

        
            <div className='register-form'>
            {errorMassage && <p className='error'>{errorMassage}</p>}
            {succesfulMassage && <p className='success'>{succesfulMassage}</p>}
                <h2>Registration</h2>
                <form onSubmit={saveData}>

                    <div className='groups'>
                        <label htmlFor="">Name</label>
                        <input type="text" name='name' onChange={change} value={data.name} />
                    </div>
                    <div className='groups'>
                        <label htmlFor="">Email</label>
                        <input type="text" name='email' onChange={change} value={data.email} />
                    </div>
                    <div className='groups'>
                        <label htmlFor="">Phone</label>
                        <input type="text" name='phone' onChange={change} value={data.phone} />
                    </div>
                    <div className='groups'>
                        <label htmlFor="">Password</label>
                        <input type="text" name='password' onChange={change} value={data.password} />
                    </div>

                    <button className='register-btn' type='submit' >Submit</button>

                </form>
                
            </div>
        </div>
    )
}
