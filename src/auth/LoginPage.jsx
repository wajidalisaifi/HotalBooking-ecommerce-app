import React, { useState } from 'react'
import './Auth.css'
import ApiService from '../service/ApiService'
import { useLocation, useNavigate } from 'react-router-dom'

export default function LoginPage() {


    let [data,setData] =useState({
        "email":"",
        "password":""
    })

    let [errorMassage, setErrorMassage] = useState(null)
    let [successful, setSuccessful] = useState(null)
    let navigate  = useNavigate();
    let location  = useLocation();

    let from = location.state?.from?.pathname || '/Home'       // optional chaining ?.

    let sendData = (e) => {
        let{name,value} = e.target
        setData({...data,[name]:value})
    }

    let validation = () => {
        let {email,password} = data
        if(!email || !password){
            return false
        }
        return true
    }

    let handel =  async(e) => {
        e.preventDefault();
        if( !validation()){
            setErrorMassage("please fill all fiedls")
            setTimeout(()=>setErrorMassage(''),1000)
            return
        }

        try{

           let response  = await  ApiService.setLogin(data)
          
           if(response.statusCode === 200){
    
            localStorage.setItem('token',response.token)
            localStorage.setItem('role',response.role)
            navigate(from,{replace:true})
           }

        }
        catch(error){
            setErrorMassage(error.response?.data?.message || error.message)
            setTimeout(()=> setErrorMassage(''),3000)
        }

    }

    return (
        <div className='login-container'>
            <div className='login-form'> 

                {errorMassage && <p className='error'> {errorMassage} </p>}
                {successful && <p>{successful}</p> }
                <h2>Login</h2>

                <form  onSubmit={handel}  >

                    <div className='group'>
                        <label htmlFor="">Email</label>
                        <input type="text" onChange={sendData} name='email' value={data.email} />
                    </div>

                    <div className='group'>
                        <label htmlFor="">Password</label>
                        <input type="text" onChange={sendData} name='password' value={data.password} />
                    </div>

                    <button type='submit' className='login-btn'>Login</button>

                    <div className='sign-up'>
                        <p>i don't have an acount <a href="/registration">sign up</a></p>
                    </div>

                </form>

            </div>
        </div>
    )
}
