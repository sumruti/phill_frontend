import React from 'react';
import './Footer.css';

// A footer component has:
// - icon img
// - title
// - Component to render
// - render prop
const Footer = ({ componentsInfo, handleCurrentComponentChange }) => {
    const footerComponents = Object.keys(componentsInfo).map((key, idx) => {
        const { type, iconImg, title } = componentsInfo[key]
        return (
            <div className='footer_item' key={idx} onClick={() => handleCurrentComponentChange(type)}>
                {(
                    <React.Fragment>
                        <div className='footer_item_img_container'>
                            <img className='footer_item_img' src={iconImg} alt={title} />
                        </div>
                    </React.Fragment>
                )}
                <span className={`footer_item_title`}>{title}</span>
            </div>
        )
    })
    return (
        <div className='footer_container'>
            {footerComponents}
        </div>
    )
}

export default Footer;