import React from 'react';

import Search from './Search';
import Table from './Table';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      results: [],
      refreshTable: false,
      inputError: ""
    }

    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearchQueryChange(e) {
    this.setState({searchQuery: e.target.value});
  }

  onSearch() {

    let searchQuery = this.state.searchQuery;

    if (!searchQuery) {
      this.setState({inputError: "Please enter search text."});
      return;
    } else {
        this.setState({inputError: ""});
    }
    // Actual api call
    this.getData(this.state.searchQuery);

    // Mock api call
    /*
    setTimeout(() => {
      let refreshTable = !this.state.refreshTable;
      let data = this.getDataMock(this.state.searchQuery);
      let res = (data.response && data.response.groups) ? data.response.groups[0].items : [];
      this.setState({results: res, refreshTable: refreshTable});
    }, 1000)
    */
    
  }

  getData = address => {
    // todo: read credentials from environment
    const qs = `?client_id=XIVFA1NRVISYWF34PWGORXLFV4KVDGBXU35254B2GJ3NBQIN&client_secret=31H1Q2PQ10EUWB01F3V1AWAGVGKUAK3WTOWJMUZGQTMU0C3A&query=lunch&near=${address}&v=20170801&limit=3`
    const url = `https://api.foursquare.com/v2/venues/explore${qs}`;

    fetch(url)
      .then(results => results.json())
      .then(data => {
        let refreshTable = !this.state.refreshTable;
        let res = (data.response && data.response.groups) ? data.response.groups[0].items : [];
        this.setState({results: res, refreshTable: refreshTable});
      });
  };

  getDataMock(number){
      if (isNaN(number)) { return {}; }

      let num = parseInt(number);
      let data = {response: {}};
      let group = {};
      group.items = [];
      for (let i = 1; i < 4; i++){
        let item = {};
            item.venue = {
                name: "Venue " + (i + num).toString(),
                categories: [{name: "Restaurant " + (i + num).toString()}],
                rating: i * i,
                url: "http://www.google.com"
            };
        group.items[i-1] = item;
      }
      data.response.groups = [group];

      return data;

    }

  render() {
    const {results, searchQuery, refreshTable, inputError} = this.state;

    return (<div>
      <Search
        searchQuery={searchQuery}
        onChange={this.onSearchQueryChange}
        search={this.onSearch}
        inputError={inputError}
      />
      
      <Table headings={results} refreshTable={refreshTable}/>

    </div>);
  }
}

export default Container;