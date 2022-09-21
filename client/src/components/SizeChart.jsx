import React from "react";
import { Link } from "react-router-dom";
import NavBar from './NavBar';

const sizeChart = () => {
    return (
        <>
        <NavBar/>
        <div className="flex flex-col items-center justify-center mt-28">
        <div className="flex flex-col items-center justify-center h-6/8 w-1/5 bg-[#00ff01] rounded-lg">
            <h1 className="text-4xl italic font-semibold mt-4">Size Chart</h1>
            <div>
            <table className="table-auto mb-4 border-black">
                <thead>
                <tr>
                    <th className="px-4 py-2">Size</th>
                    <th className="px-4 py-2">US</th>
                    <th className="px-4 py-2">UK</th>
                    <th className="px-4 py-2">EU</th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">6</td>
                    <td className="border px-4 py-2 border-black">6</td>
                    <td className="border px-4 py-2 border-black">3.5</td>
                    <td className="border px-4 py-2 border-black">36</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">6.5</td>
                    <td className="border px-4 py-2 border-black">6.5</td>
                    <td className="border px-4 py-2 border-black">4</td>
                    <td className="border px-4 py-2 border-black">37</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">7</td>
                    <td className="border px-4 py-2 border-black">7</td>
                    <td className="border px-4 py-2 border-black">4.5</td>
                    <td className="border px-4 py-2 border-black">38</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">7.5</td>
                    <td className="border px-4 py-2 border-black">7.5</td>
                    <td className="border px-4 py-2 border-black">5</td>
                    <td className="border px-4 py-2 border-black">39</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">8</td>
                    <td className="border px-4 py-2 border-black">8</td>
                    <td className="border px-4 py-2 border-black">5.5</td>
                    <td className="border px-4 py-2 border-black">40</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">8.5</td>
                    <td className="border px-4 py-2 border-black">8.5</td>
                    <td className="border px-4 py-2 border-black">6</td>
                    <td className="border px-4 py-2 border-black">41</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">9</td>
                    <td className="border px-4 py-2 border-black">9</td>
                    <td className="border px-4 py-2 border-black">6.5</td>
                    <td className="border px-4 py-2 border-black">42</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">9.5</td>
                    <td className="border px-4 py-2 border-black">9.5</td>
                    <td className="border px-4 py-2 border-black">7</td>
                    <td className="border px-4 py-2 border-black">43</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">10</td>
                    <td className="border px-4 py-2 border-black">10</td>
                    <td className="border px-4 py-2 border-black">7.5</td>
                    <td className="border px-4 py-2 border-black">44</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">10.5</td>
                    <td className="border px-4 py-2 border-black">10.5</td>
                    <td className="border px-4 py-2 border-black">8</td>
                    <td className="border px-4 py-2 border-black">45</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">11</td>
                    <td className="border px-4 py-2 border-black">11</td>
                    <td className="border px-4 py-2 border-black">8.5</td>
                    <td className="border px-4 py-2 border-black">46</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 border-black">11.5</td>
                    <td className="border px-4 py-2 border-black">11.5</td>
                    <td className="border px-4 py-2 border-black">9</td>
                    <td className="border px-4 py-2 border-black">47</td>
                </tr>
                </tbody>
            </table>
            </div>
            <div className="flex justify-center">
            <Link to= '/'><button className="text-2xl bg-black text-[#00ff01] hover:text-black font-semibold rounded-lg border-2 mt-4 border-black mb-4">Home</button></Link>
            </div>
        </div>
        </div>
        </>
    );
};

export default sizeChart;