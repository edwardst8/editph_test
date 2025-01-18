import React from 'react';
import ZoomableImage from './ZoomableImage';

const ImageDisplay = ({ image }) => {
    return (
        <div className="image-display">
            {image ? <ZoomableImage src={image} /> : <p>Nu a fost încărcată nicio imagine.</p>}
        </div>
    );
};

export default ImageDisplay;
