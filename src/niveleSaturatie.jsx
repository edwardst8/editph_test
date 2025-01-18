const applySaturation = (originalCanvas, editedCanvas) => {
    const ctxEdited = editedCanvas.getContext('2d');
    editedCanvas.width = originalCanvas.width;
    editedCanvas.height = originalCanvas.height;
    ctxEdited.drawImage(originalCanvas, 0, 0);

    const imageData = ctxEdited.getImageData(0, 0, editedCanvas.width, editedCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Calcul luminozitate
        let avg = (r + g + b) / 3;

        // Ajustare canale de culoare
        data[i]     += (r - avg) * 0.3;   // R
        data[i + 1] += (g - avg) * 0.3;   // G
        data[i + 2] += (b - avg) * 0.3;   // B
    }

    ctxEdited.putImageData(imageData, 0, 0);
};

export default applySaturation;
