import React, { useRef, useState } from 'react';
import applyGrayscale from './tonurideGri';
import applySaturation from './niveleSaturatie'; 
import ImageZoom from './imageZoom'; 
import ErrorMessage from './mesajedeEroare';
import LuminozitateContrast from './luminozitateContrast';


const ImageEditor = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [editedImage, setEditedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLuminozitateContrast, setShowLuminozitateContrast] = useState(false);
    const [brightness, setBrightness] = useState(0);
    const [contrast, setContrast] = useState(0);
    const originalCanvasRef = useRef(null);
    const editedCanvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const loadImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const originalCanvas = originalCanvasRef.current;
                originalCanvas.width = img.width;
                originalCanvas.height = img.height;

                const ctxOriginal = originalCanvas.getContext('2d');
                ctxOriginal.drawImage(img, 0, 0);

                setOriginalImage(img);
                setErrorMessage('');

                setBrightness(0);
                setContrast(0);

                handleApplyLuminozitateContrast(0, 0);
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    };

    const clearImage = () => {
        setOriginalImage(null);
        setEditedImage(null);
        const originalCanvas = originalCanvasRef.current;
        const editedCanvas = editedCanvasRef.current;
        const ctxOriginal = originalCanvas.getContext('2d');
        const ctxEdited = editedCanvas.getContext('2d');
        ctxOriginal.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
        ctxEdited.clearRect(0, 0, editedCanvas.width, editedCanvas.height);
        setBrightness(0);
        setContrast(0);
    };

    const saveEditedImage = () => {
        if (!editedImage) return;
    
        const confirmSave = window.confirm("Imaginea se va salva :)");
        if (confirmSave) {
            const link = document.createElement('a');
            link.href = editedImage;
            link.download = 'imagine-editata.png';
            link.target = '_blank';
            
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
        }
    };

    const applyEffectsAndUpdateCanvas = (effect) => {
        if (!originalImage) {
            setErrorMessage('Te rog sa ncarci o imagine inainte de a aplica efecte.');
            return;
        }

        const originalCanvas = originalCanvasRef.current;
        const editedCanvas = editedCanvasRef.current;

        if (effect === 'grayscale') {
            applyGrayscale(originalCanvas, editedCanvas);
        } else if (effect === 'saturation') {
            applySaturation(originalCanvas, editedCanvas);
        }

        const editedImageDataUrl = editedCanvas.toDataURL();
        setEditedImage(editedImageDataUrl);
    };

    const handleApplyLuminozitateContrast = (brightnessValue, contrastValue) => {
        if (!originalImage) {
            setErrorMessage('Te rog sa ncarci o imagine inainte de a aplica efecte.');
            return;
        }

        const originalCanvas = originalCanvasRef.current;
        const editedCanvas = editedCanvasRef.current;

        editedCanvas.width = originalCanvas.width;
        editedCanvas.height = originalCanvas.height;

        const ctxEdited = editedCanvas.getContext('2d');
        ctxEdited.clearRect(0, 0, editedCanvas.width, editedCanvas.height);
        ctxEdited.drawImage(originalCanvas, 0, 0);
        ctxEdited.filter = `brightness(${parseInt(brightnessValue) + 100}%) contrast(${parseInt(contrastValue) + 100}%)`;
        ctxEdited.drawImage(originalCanvas, 0, 0);

        const editedImageDataUrl = editedCanvas.toDataURL();
        setEditedImage(editedImageDataUrl);
    };

    return (
        <div className="image-editor-container">
            <div className="editor-panel" style={{ width: '33%', borderRight: '1px solid #ccc' }}>
                <h2>Gheorghe Emilia <br/> Proiect de disertatie</h2>
                <button class="butonprimar" onClick={() => fileInputRef.current.click()}>Incarca o imagine</button>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={loadImage} 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                />
                <button 
                    class="butonprimar"
                    onClick={clearImage} 
                    disabled={!originalImage} 
                    style={{ opacity: originalImage ? 1 : 0.5 }}
                >
                    Sterge imaginea curenta
                </button>

                <button
                    class="butonprimar"
                    onClick={() => saveEditedImage()}
                    disabled={!editedImage}
                    style={{
                        opacity: editedImage ? 1 : 0.5,
                        cursor: editedImage ? 'pointer' : 'not-allowed',
                    }}
                >
                    Salveaza imaginea editata
                </button>

                <br/>

                <h2>Filtre nivel</h2>

                <button onClick={() => applyEffectsAndUpdateCanvas('grayscale')}
                    disabled={!originalImage} 
                    style={{ opacity: originalImage ? 1 : 0.5 }}
                    >Grayscale</button>
                <button onClick={() => applyEffectsAndUpdateCanvas('saturation')}
                    disabled={!originalImage} 
                    style={{ opacity: originalImage ? 1 : 0.5 }}
                    >Saturatie +30%</button>

                {/* buton pentru a afisa sliderele */}
                <button 
                onClick={() => setShowLuminozitateContrast(!showLuminozitateContrast)}
                disabled={!originalImage} 
                style={{ opacity: originalImage ? 1 : 0.5 }}
                >
                    {showLuminozitateContrast ? 'Ascunde submeniul' : 'Ajustare luminozitate/contrast'}
                </button>

                {showLuminozitateContrast && (
                    <LuminozitateContrast
                        brightness={brightness}
                        contrast={contrast}
                        setBrightness={setBrightness}
                        setContrast={setContrast}
                        isImageLoaded={!!originalImage} 
                        handleApplyLuminozitateContrast={handleApplyLuminozitateContrast}
                    />
                )}
            </div>

            {/* imaginea originala */}
            <div className="image-container" style={{ width: '33%', padding: '10px', position: 'relative' }}>
                <h2>Imagine Originală</h2>
                
                {!originalImage && (
                    <ErrorMessage message='Pentru functionalitatea optima a modulelor, o imagine trebuie incarcata' />
                )}
                
                <ImageZoom>
                    <canvas ref={originalCanvasRef} className="image-canvas"></canvas>
                </ImageZoom>
                
            </div>

            {/* imaginea editata */}
            <div className="image-container" style={{ width: '33%', padding: '10px', position: 'relative' }}>
                <h2>Imagine Editată</h2>
                
                <ImageZoom>
                    <canvas ref={editedCanvasRef} className="image-canvas"></canvas>
                </ImageZoom>
                
            </div>
        </div>
    );
};

export default ImageEditor;
