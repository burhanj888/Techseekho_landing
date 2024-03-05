// ConfirmationModal.jsx
import React from 'react';
import "./Header2.css";


const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>Are you sure you want to logout?</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;

// Add some basic styles for the modal
// You can customize these styles as per your application's design
