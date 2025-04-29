import React from 'react';
import './Home.css';

export default function Home() {
    return (
        <div className='Container' >
            <div className='imgContainer'>
                {/* <div> */}
                    <img className='img' src="./assets/img.png" alt="" />
                {/* </div> */}

                <div className='text'>
                    <div className='width'>
                        Welcome to  <span className='clr'> Resort Hotel </span>
                    </div>
                    <h3>Step into a haven of comfort and care</h3>
                </div>
            </div>

        </div>
    )
}
