import React, { useState } from 'react';

const ImageZoom = ({ children }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        // Get the bounding rectangle of the container
        const rect = event.currentTarget.getBoundingClientRect();
        // Calculate mouse position relative to the container
        const x = clientX - rect.left; // Mouse X position relative to container
        const y = clientY - rect.top;  // Mouse Y position relative to container
        setMousePosition({ x, y });
    };

    return (
        <div
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            style={{
                position: 'relative',
                overflow: 'hidden', // Hide overflow
                cursor: 'zoom-in',
                margin: '0',
                display: 'inline-block',
                height: '80%', // Fixed height for container
                width: '80%',  // Fixed width for container
            }}
        >
            {/* Zoomed image */}
            <div
                style={{
                    transform: isZoomed 
                        ? `translate(-${mousePosition.x * 4}px, -${mousePosition.y * 4}px) scale(4.5)` 
                        : 'scale(1)',
                    transition: 'transform 0.1s ease', // Smooth transition for zoom
                    position: 'absolute', // Position absolute to keep it in place
                    top: '0%', // Start from top left corner
                    left: '0%', // Start from top left corner
                    transformOrigin: '0 0', // Set origin to top left for scaling
                    zIndex: 2,
                    pointerEvents: isZoomed ? 'none' : 'auto', // Prevent interaction with zoomed image
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ImageZoom;
