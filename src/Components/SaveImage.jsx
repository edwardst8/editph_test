import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const SaveImage = ({ editedImage }) => {
    const handleSave = () => {
        if (!editedImage) return;

        const link = document.createElement('a');
        link.href = editedImage; // URL-ul imaginii editate
        link.download = 'edited-image.png'; // Numele fișierului salvat
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Curăță link-ul după utilizare
    };

    return (
        <button onClick={handleSave} disabled={!editedImage} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faSave} />
        </button>
    );
};

export default SaveImage;
