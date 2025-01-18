import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

const GrayScaleModule = ({ uploadedImage, setEditedImage, disabled }) => {
    const handleConvertToGray = () => {
        if (!uploadedImage) return;

        const img = new Image();
        img.src = uploadedImage;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Convert to grayscale
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
                imageData.data[i]     = avg; // R
                imageData.data[i + 1] = avg; // G
                imageData.data[i + 2] = avg; // B
            }
            ctx.putImageData(imageData, 0, 0);
            setEditedImage(canvas.toDataURL());
        };
    };

    return (
        <button onClick={handleConvertToGray} disabled={disabled}>
            <FontAwesomeIcon icon={faPalette} style={{ marginRight: '5px' }} />
        </button>
    );
};

export default GrayScaleModule;
