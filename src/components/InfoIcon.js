import React from 'react';

function InfoIcon({ infoText }) {
    return (
        <div className="gpa-chart__info-container">
            <img src="/assets/images/info.svg" alt="Info Icon" className="gpa-chart__info" />
            <div className="gpa-chart__info-popup" dangerouslySetInnerHTML={{ __html: infoText }} />
        </div>
    );
}

export default InfoIcon;