import React from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import GoogleLogo from '../assets/google-logo.png'
import Stock from './Stock'
const Home = () => {



    
    return (
        <div className='w-screen overflow-x-hidden h-screen'>
            <Navbar />
            <div className='pt-10 sm:pt-20'>
                <img className='m-auto w-s  select-none pointer-events-none bg-transparent' src={GoogleLogo} alt="Google Logo" draggable="false" />
            </div>
            <SearchBar />
            <Stock/>
        </div>
    )
}

export default Home