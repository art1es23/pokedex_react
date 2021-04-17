import React from 'react';

import './error-message.css';
import img from './error.png';

const ErrorMessage = () => {
    return (
        <>
            <img src={img} alt=""/>
            <span>Something goes wrong!</span>
        </>
    )
}

export default ErrorMessage;