import React from 'react';
import './Search.css';

class Search extends React.Component {
    
    render() {

        const {
            searchQuery,
            onChange,
            search,
            inputError
          } = this.props;
        

        return (<div className="Search">
        <input autoFocus
          placeholder="Enter number for mock, text for real"
          className="Search-input"
          type="text"
          value={searchQuery}
          onChange={onChange}
        />
        <button className="Search-button" onClick={search}>Search</button>
        {inputError ?
          <div className="Search-input-error">
              <label>{inputError}</label>
          </div>
          :
          null
        }
        </div>);
    }
}

export default Search;