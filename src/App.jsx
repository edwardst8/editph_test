import React, { useState } from 'react';
import Menu from './Components/Menu';
import ImageDisplay from './Components/ImageDisplay';
import EditedImageDisplay from './Components/EditedImageDisplay';
import './App.css';

const App = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [editedImage, setEditedImage] = useState(null);

    return (
        <div className="app-container">
            <div className="header">Proiect de disertatie | Gheorghe Emilia</div>
            <div className="container">
                <div className="menu-container">
                    <Menu
                        uploadedImage={uploadedImage}
                        setUploadedImage={setUploadedImage}
                        setEditedImage={setEditedImage} 
                        editedImage={editedImage} // Transmite editedImage aici
                    />
                </div>
                <div className="container">
                    <div className="image-container">
                        <ImageDisplay image={uploadedImage} />
                    </div>
                    <div className="edited-image-container">
                        <EditedImageDisplay image={editedImage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
