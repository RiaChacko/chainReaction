import React from 'react';
import './CategoriesMode.css';
import { useNavigate } from 'react-router-dom';

const CategoriesMode = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/home');
    };

    return (
        <div className="categories-container">
            <button onClick={handleBack} className="back-btn">← Back</button>
            <h1 className="title">Categories Mode</h1>
            <p className="coming-soon">Coming soon! 🧠</p>
            <p className="description">In this mode, words will need to match a given category like animals, food, or countries. Stay tuned!</p>
        </div>
    );
};

export default CategoriesMode;
