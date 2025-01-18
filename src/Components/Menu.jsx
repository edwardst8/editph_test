import React, { useState } from 'react';
import SaturationModule from './SaturationModule';
import GrayScaleModule from './GrayScaleModule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash, faCrop } from '@fortawesome/free-solid-svg-icons';
import AspectRatioMenu from './AspectRatioMenu'; // Importă noul component
import SaveImage from './SaveImage'; // Importă componentul de salvare a imaginii

const Menu = ({ uploadedImage, setUploadedImage, setEditedImage, editedImage }) => {
    const [showAspectRatioMenu, setShowAspectRatioMenu] = useState(false);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
                setEditedImage(null); // Reset edited image on new upload
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {
        setUploadedImage(null);
        setEditedImage(null);
    };

    const toggleAspectRatioMenu = () => {
        setShowAspectRatioMenu(!showAspectRatioMenu);
    };

    // Determină dacă butoanele ar trebui să fie dezactivate
    const isDisabled = !uploadedImage;

    return (
        <div className="menu">
            <label htmlFor="upload-button" style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faUpload} size="lg" />
            </label>
            <input 
                id="upload-button" 
                type="file" 
                onChange={handleUpload} 
                style={{ display: 'none' }} // Ascunde input-ul original
            />
            <button onClick={handleDelete} disabled={isDisabled}>
                <FontAwesomeIcon icon={faTrash} size="lg" />
            </button>

            {/* Transmite editedImage în loc de setEditedImage */}
            <SaveImage editedImage={editedImage} />

            <h3>///</h3>
            <SaturationModule uploadedImage={uploadedImage} setEditedImage={setEditedImage} disabled={isDisabled} />
            <GrayScaleModule uploadedImage={uploadedImage} setEditedImage={setEditedImage} disabled={isDisabled} />

            <button onClick={toggleAspectRatioMenu} disabled={isDisabled}>
                <FontAwesomeIcon icon={faCrop} size="lg" />
            </button>

            {showAspectRatioMenu && (
                <AspectRatioMenu 
                    onClose={toggleAspectRatioMenu} 
                    uploadedImage={uploadedImage} 
                    setEditedImage={setEditedImage} 
                />
            )}
        </div>
    );
};

export default Menu;
