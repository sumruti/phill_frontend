import React, { Component } from 'react';
import './LangPicker.css';

const LangPicker = ({ handleLangChange, langs, selectedLang }) => {

    let options = langs.map((lang, idx) => {
        return <option key={idx} value={lang.toLowerCase()}>{lang.toUpperCase()}</option>
    })

    return (
        <select className="lang_picker" value={selectedLang} onChange={handleLangChange}>
            {options}
        </select>
    );

}

export default LangPicker;