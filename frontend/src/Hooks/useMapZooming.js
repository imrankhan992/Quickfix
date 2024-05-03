import React, { useEffect, useState } from "react";

const useMapZooming = () => {
    const [zoom, setZoom] = useState(10); // Starting zoom level
    const [direction, setDirection] = useState(0.1); // Initial direction is to increase zoom level

    useEffect(() => {
        const zoomInterval = setInterval(() => {
            // Adjust zoom level based on current value and direction
            if (zoom > 15) {
                setDirection(-0.1); // Change direction to decrease zoom level if greater than 15
            } else if (zoom <= 10) {
                setDirection(1); // Change direction to increase zoom level if less than or equal to 10
            }
            setZoom(prevZoom => prevZoom + direction); // Update zoom level based on direction
        }, 1000); // Adjust the interval duration as needed (in milliseconds)

        return () => clearInterval(zoomInterval); // Cleanup function to clear the interval
    }, [zoom, direction]); // Run effect when zoom or direction changes

    return { zoom };
};

export default useMapZooming;
