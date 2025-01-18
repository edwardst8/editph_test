// tonurideGri.js
const applyGrayscale = (originalCanvas, editedCanvas) => {
    const ctxEdited = editedCanvas.getContext('2d');
    editedCanvas.width = originalCanvas.width;
    editedCanvas.height = originalCanvas.height;
    ctxEdited.drawImage(originalCanvas, 0, 0);

    const imageData = ctxEdited.getImageData(0, 0, editedCanvas.width, editedCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i]     = avg; // R
        data[i + 1] = avg; // G
        data[i + 2] = avg; // B
    }

    ctxEdited.putImageData(imageData, 0, 0);
};

export default applyGrayscale;
