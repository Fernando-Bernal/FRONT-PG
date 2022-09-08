import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaSpotify } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className='w-full bg-black text-white py-y px-2'>
            <div className='max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-[#00ff01] py-8'>
                <div>
                        <h6 className='font-bold text-center text-[#00ff01] uppercase pt-2'>More links</h6>
                            <ul>
                                <Link to='AboutUs'> <li className='py-2 text-center hover:text-[#00ff01]'>About Us
                                </li></Link>
                                <Link to='ContactUs'> <li className='py-2 text-center hover:text-[#00ff01]'>Contact Us</li></Link>
                                <Link to='SizeChart'><li className='py-2 text-center hover:text-[#00ff01]'>Size Chart</li></Link>
                                <li className='py-2 text-center'>Terms of Service</li>
                            </ul>
                </div>

                <div className='col-start-3 col-end-4 pt-8 md:pt-2'>
                    <p className='font-bold text-[#00ff01] text-center uppercase'>Follow US</p>
                    <p className='flex mt-6 pl-1 space-x-4'>
                        <FaFacebook className='text-white text-6xl mx-2' />
                        <FaInstagram className='text-white text-6xl mx-2' />
                        <FaTwitter className='text-white text-6xl mx-2' />
                        <FaSpotify className='text-white text-6xl mx-2' />
                        
                    </p>
                    
                </div>
                
                <div className='col-start-5 col-end-7 pt-8 md:pt-2'>
                    <p className='font-bold text-[#00ff01] text-center uppercase'>Newsletter</p>
                    <p className='py-4 text-center'>Subscribe to get special offers, news, special entries, and exclusive deals.</p>
                    <form className='flex flex-col sm:flex-row'>
                        <input className='w-full p-2 mr-4 rounded-md mb-4' type="email" placeholder='Your email...' />
                        <button className='p-2 mb-4'>Subscribe</button>
                    </form>
                </div>
            </div>
            <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500'>
                <p className='py-4'>©2022, Sneaker Paradise</p>
                <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
                </div>
            </div>
          
        </div>
    )
}

export default Footer