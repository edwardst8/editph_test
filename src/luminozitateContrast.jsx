// LuminozitateContrast.jsx
import React from 'react';

const LuminozitateContrast = ({ brightness, contrast, setBrightness, setContrast, isImageLoaded, handleApplyLuminozitateContrast }) => {
    const handleBrightnessChange = (e) => {
        const newBrightness = e.target.value;
        setBrightness(newBrightness);
        handleApplyLuminozitateContrast(newBrightness, contrast); // Actualizează imaginea
    };

    const handleContrastChange = (e) => {
        const newContrast = e.target.value;
        setContrast(newContrast);
        handleApplyLuminozitateContrast(brightness, newContrast); // Actualizează imaginea
    };

    return (
        <div className="luminozitate-contrast">
            <h3>Ajustare Luminozitate și Contrast</h3>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Luminozitate:
                    <input
                        className="slidere_contrastlumina"
                        type="range"
                        min="-100"
                        max="100"
                        value={brightness}
                        onChange={handleBrightnessChange}
                        disabled={!isImageLoaded} // Dezactivează slider-ul dacă nu este încărcată o imagine
                    />
                </label>
                <span> {brightness} %</span> {/* Afișează procentajul lângă slider */}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Contrast:
                    <input
                        className="slidere_contrastlumina"
                        type="range"
                        min="-100"
                        max="100"
                        value={contrast}
                        onChange={handleContrastChange}
                        disabled={!isImageLoaded} // Dezactivează slider-ul dacă nu este încărcată o imagine
                    />
                </label>
                <span> {contrast} %</span> {/* Afișează procentajul lângă slider */}
            </div>
        </div>
    );
};

export default LuminozitateContrast;
