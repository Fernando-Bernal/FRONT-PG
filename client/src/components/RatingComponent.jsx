//rating component
import React from 'react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ selected = false, onSelect = (f) => f }) => (
    <div className='' >
    <FaStar color={selected ? 'yellow' : 'grey'} onClick={onSelect} />
    </div>
);


export default function StarRating({ totalStars = 5 }) {
    const [selectedStars, setSelectedStars] = useState(0);
    return (
        <div className='flex flex-row pt-8 ' >
            {[...Array(totalStars)].map((n, i) => (
                <Star
                    key={i}
                    selected={selectedStars > i}
                    onSelect={() => setSelectedStars(i + 1)}
                />
            ))}
        </div>
    );
}

