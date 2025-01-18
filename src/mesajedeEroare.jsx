// ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message }) => {
    if (!message) return null; // Nu afișa nimic dacă nu există un mesaj

    return (
        <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
    );
};

export default ErrorMessage;
