import React from "react";
import { Link } from "react-router-dom";
import NavBar from './NavBar';

const aboutUs = () => {
    return (
        <>
        <NavBar/>
        <div className="flex flex-col items-center justify-center mt-28">
        <div className="flex flex-col rounded-lg items-center justify-center h-[400px] w-[700px] bg-[#00ff01]">
            <h1 className="text-6xl tracking-wide font-semibold pb-8">ABOUT US</h1>
            <p className="text-2xl text-center font-semibold px-4">
            This web page was born as a request for the Final Project of the FT27B group 07 team,
            in order to graduate from Henry, made up of a team of 7 people, from 3 different countries,
            they work hard to offer the project owner a sample of their skills and teamwork to be able to graduate successfully.
            </p>
        </div>
            <Link to= '/'><button className="text-2xl font-semibold mt-4">Home</button></Link>
        </div>
        </>
    );
};

export default aboutUs;