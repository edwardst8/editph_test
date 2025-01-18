import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';

const SaturationModule = ({ uploadedImage, setEditedImage, disabled }) => {
    const [saturation, setSaturation] = useState(0);
    const [whiteBalance, setWhiteBalance] = useState(5000); // Temperatura de bază (Kelvin)
    const [showSubmenu, setShowSubmenu] = useState(false);

    const applyEffects = () => {
        if (!uploadedImage) return;

        const img = new Image();
        img.src = uploadedImage;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                // Aplică saturația
                imageData.data[i] *= (1 + saturation / 100);     // R
                imageData.data[i + 1] *= (1 + saturation / 100); // G
                imageData.data[i + 2] *= (1 + saturation / 100); // B

                // Ajustează balansul de alb
                const kelvinToRGB = (temp) => {
                    let r, g, b;

                    if (temp <= 6600) {
                        r = 255;
                        g = Math.round(temp / 100 * -155.254 + 255);
                        b = temp <= 1900 ? 0 : Math.round(temp / 100 * (138.517 - ((temp / 100 - 2) * 0.075)));
                    } else {
                        r = Math.round(temp / 100 * -2.554 + 255);
                        g = Math.round(temp / 100 * -1.068 + 255);
                        b = Math.round(temp / 100 * -1.068 + 255);
                    }

                    return [r, g, b];
                };

                const [rAdj, gAdj, bAdj] = kelvinToRGB(whiteBalance);

                imageData.data[i] *= rAdj / 255;     // R
                imageData.data[i + 1] *= gAdj / 255; // G
                imageData.data[i + 2] *= bAdj / 255; // B

                // Asigură-te că valorile nu depășesc limitele
                imageData.data[i]     = Math.min(Math.max(imageData.data[i], 0), 255);
                imageData.data[i + 1] = Math.min(Math.max(imageData.data[i + 1], 0), 255);
                imageData.data[i + 2] = Math.min(Math.max(imageData.data[i + 2], 0), 255);
            }
            ctx.putImageData(imageData, 0, 0);
            setEditedImage(canvas.toDataURL());
        };
    };

    return (
        <div style={{ position: 'relative' }}>
            <button onClick={() => setShowSubmenu(!showSubmenu)} disabled={disabled}>
                <FontAwesomeIcon icon={faDroplet} style={{ marginRight: '5px' }} />
            </button>
            {showSubmenu && (
                <div className="saturation-submenu">
                    <div>
                        <label>Saturatie:</label>
                        <input 
                            type="range" 
                            min="-100" 
                            max="100" 
                            value={saturation} 
                            onChange={(e) => {
                                setSaturation(Number(e.target.value));
                                applyEffects(); // Aplică efectele doar când slider-ul este modificat
                            }} 
                        />
                    </div>
                    <div>
                        <label>Balans de alb (K):</label>
                        <input 
                            type="range" 
                            min="2000" 
                            max="8000" 
                            value={whiteBalance} 
                            onChange={(e) => {
                                setWhiteBalance(Number(e.target.value));
                                applyEffects(); // Aplică efectele doar când slider-ul este modificat
                            }} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SaturationModule;
