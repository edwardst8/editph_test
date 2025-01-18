import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ImageModal = ({ isOpen, onClose, imageSrc, zoomLevel, increaseZoomLevel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <Zoom>
                    <img 
                        src={imageSrc} 
                        alt="Zoomed" 
                        style={{ 
                            width: `${zoomLevel * 100}%`, 
                            height: 'auto', 
                            maxHeight: '80vh', 
                            objectFit: 'contain' 
                        }} 
                    />
                </Zoom>
                <div className="modal-buttons">
                    <button onClick={increaseZoomLevel}>Mărire Mai Multă</button>
                    <button onClick={onClose}>Ieșire</button>
                </div>
            </div>

            {/* Stiluri pentru modal */}
            <style jsx>{`
                .modal {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                }
                
                .modal-content {
                    position: relative;
                    margin: auto;
                    padding: 20px;
                    max-width: calc(80% - 40px); /* Maximizează lățimea modalului */
                    max-height: calc(80vh - 40px); /* Maximizează înălțimea modalului */
                    overflow-y: auto; /* Permite derularea pe verticală */
                }

                .close {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    color: white;
                    font-size: 30px;
                    font-weight: bold;
                    cursor: pointer;
                }
                
                .modal-buttons {
                    margin-top: 20px; /* Distanță între imagine și butoane */
                }
            `}</style>
        </div>
    );
};

export default ImageModal;
