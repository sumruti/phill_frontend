import React, { PureComponent } from 'react';
import { _STRINGS } from '../../utils/_globals';
import './SearchForm.css';

const { _SEARCH_FORM_INPUT_PLACEHOLDER } = _STRINGS;

class SearchForm extends PureComponent {
    state = {
        searchTerm: ''
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.props.handleSearch(e.target.value, 'searchForm')
    }

    handleFormSubmit = e => {
        e.preventDefault();
    }

    render() {
        return (
            <form className="search_form" onSubmit={this.handleFormSubmit}>
                <div className='search_form_search_icon_container_wrapper'>
                    <div className='search_form_search_icon_container'>
                        <img className='search_form_search_icon' src="https://img.icons8.com/ios/25/2993E2/search.png" alt='search icon' />
                    </div>
                </div>
                <input className='search_form_input' type='text' placeholder={_SEARCH_FORM_INPUT_PLACEHOLDER} name='searchTerm' value={this.state.searchTerm} onChange={this.handleInputChange} />
            </form>
        );
    }
}

export default SearchForm;