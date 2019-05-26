import React from 'react';
import './Search.css';

class Search extends React.Component {
    
    render() {

        const {
            searchQuery,
            onChange,
            search
          } = this.props;
        

        return (<div className="Search">
        <input autoFocus
          placeholder="Enter a number for mock testing"
          className="Search-box"
          type="text"
          value={searchQuery}
          onChange={onChange}
        />
        <button className="Search-button" onClick={search}>Search</button>
        </div>);
    }
}

export default Search;