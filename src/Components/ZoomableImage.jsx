import React, { useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'; // Importă stilurile

const ZoomableImage = ({ src }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // Poziția cursorului relativ la imagine
        const y = e.clientY - rect.top;
        setCursorPosition({ x, y });
    };

    return (
        <div 
            className="zoomable-image" 
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ position: 'relative', overflow: 'hidden' }} // Asigură-te că overflow-ul este ascuns
        >
            <InnerImageZoom 
                src={src} 
                zoomSrc={src} // Folosește aceeași imagine pentru zoom
                zoomScale={2.5} // Scale de zoom
                zoomType="hover" // Tip de zoom pe hover
                style={{
                    transition: 'transform 0.3s ease', // Adaugă tranziție pentru zoom
                    transformOrigin: `${cursorPosition.x*4}px ${cursorPosition.y*4}px`, // Centrarea zoom-ului pe cursor
                    transform: isHovering ? `translateX(40%)` : 'translateX(0)', // Mută imaginea cu 40% mai în dreapta la hover
                }}
            />
        </div>
    );
};

export default ZoomableImage;
