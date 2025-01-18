import React, { useState, useRef, useEffect } from 'react';

const AspectRatioMenu = ({ onClose, setEditedImage, uploadedImage }) => {
    const [customWidth, setCustomWidth] = useState('');
    const [customHeight, setCustomHeight] = useState('');
    const [aspectRatio, setAspectRatio] = useState('');
    const menuRef = useRef(null); // Referință pentru submeniu

    const aspectRatios = [
        { label: '1:1', value: '1:1' },
        { label: '3:2', value: '3:2' },
        { label: '4:3', value: '4:3' },
        { label: '16:9', value: '16:9' },
    ];

    const handleAspectRatioChange = (event) => {
        const selectedRatio = event.target.value;
        setAspectRatio(selectedRatio);
        
        // Set width and height based on selected aspect ratio
        switch (selectedRatio) {
            case '1:1':
                setCustomWidth(300);
                setCustomHeight(300);
                break;
            case '3:2':
                setCustomWidth(300);
                setCustomHeight(200);
                break;
            case '4:3':
                setCustomWidth(400);
                setCustomHeight(300);
                break;
            case '16:9':
                setCustomWidth(400);
                setCustomHeight(225);
                break;
            default:
                break;
        }
    };

    const handleApplyAspectRatio = () => {
        if (uploadedImage) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = customWidth || 300; // Default width
            canvas.height = customHeight || 300; // Default height
            
            const img = new Image();
            img.src = uploadedImage;
            img.onload = () => {
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                setEditedImage(canvas.toDataURL()); // Setează imaginea editată
                onClose(); // Închide meniul după aplicare
            };
        }
    };

    // Funcția pentru a verifica dacă clicul este în afara submeniului
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            onClose(); // Închide meniul
        }
    };

    useEffect(() => {
        // Adaugă event listener pentru click
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Curăță event listener-ul la demontare
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="aspect-ratio-menu" ref={menuRef}>
            <h3>Selectează Aspect Ratio</h3>
            <label>
                Raport de aspect:
                <select value={aspectRatio} onChange={handleAspectRatioChange}>
                    <option value="">Alege...</option>
                    {aspectRatios.map((ratio) => (
                        <option key={ratio.value} value={ratio.value}>
                            {ratio.label}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Lățime personalizată:
                <input
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    placeholder="Lățime"
                />
            </label>
            <label>
                Înălțime personalizată:
                <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    placeholder="Înălțime"
                />
            </label>
            <center>
                <button onClick={handleApplyAspectRatio}>Aplică</button>
                <button onClick={onClose}>Închide</button>
            </center>
        </div>
    );
};

export default AspectRatioMenu;
