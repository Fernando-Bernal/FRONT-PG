import React from "react";
import { Link } from "react-router-dom";
import NavBar from './NavBar';

const termsOfService = () => {
    return (
        <>
        <NavBar/>
        <div className="flex flex-col items-center justify-center mt-20">
            <div className="flex flex-col rounded-lg items-center justify-center h-[650px] w-[1100px] bg-[#00ff01]">
                <h1 className="text-6xl tracking-wide font-semibold pb-8">Terms of Service</h1>
                <p className="text-xl text-center font-semibold px-4">
                Changes to Terms and Policies.
                Snaker Paradise may in our discretion change these Terms (including the FAQs or any policy) at any time, but if we do, we will place a notice on our Site. We may also send you an email and/or notify you by some other means. Changes take effect on the date set out in the Terms. You should view these Terms often to stay informed of any changes that may affect you. YOUR CONTINUED USE OF THE SITE AND/OR SERVICES AFTER WE CHANGE THESE TERMS CONSTITUTES YOUR ACCEPTANCE OF THE CHANGES. IF YOU DO NOT AGREE TO ANY OF THE CHANGES, YOU MUST CANCEL YOUR ACCOUNT AND NOT USE ANY PORTION OF THE SERVICES.
                The version of these Terms posted on our Sites on each respective date you visit the Sites will be the Terms applicable to your access and use of the Services on that date. Our electronically or otherwise properly stored copies of these Terms and the Privacy Policy shall be deemed to be the true, complete, valid, and authentic copies of the version of the Terms and the Privacy Policy that were in force on each respective date you visited the Sites. We reserve the right to terminate these Terms, or to refuse, restrict, or discontinue access to or use of the Services (or any portions, components, or features thereof) to you or any other person or entity, if you are in breach of the Terms or for any reason or for no reason whatsoever, at any time, without notice or liability.
                </p>
            </div>
            <div className="flex justify-center">
                <Link to= '/'><button className="text-2xl font-semibold mt-4">Home</button></Link>
            </div>
        </div>
        </>
    );
}

export default termsOfService;