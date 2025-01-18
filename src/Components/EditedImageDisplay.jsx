import React from 'react';
import ZoomableImage from './ZoomableImage';

const EditedImageDisplay = ({ image }) => {
    return (
        <div className="edited-image-display">
            {image ? <ZoomableImage src={image} /> : <p>Nu există imagine editată.</p>}
        </div>
    );
};

export default EditedImageDisplay;
