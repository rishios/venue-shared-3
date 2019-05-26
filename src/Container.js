import React from 'react';

import Search from './Search';
import Table from './Table';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      results: [],
      refreshTable: false
    }

    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearchQueryChange(e) {
    this.setState({searchQuery: e.target.value});
  }

  onSearch() {
    // todo: there is an issue in passing result of actual api call to Table component. Need to fix it
    //this.getData(this.state.searchQuery);

    // Mock api call
    setTimeout(() => {
      let data = this.getDataMock(this.state.searchQuery).groups[0].items;
      let refreshTable = !this.state.refreshTable;
      this.setState({results: data, refreshTable: refreshTable});
      //console.log(data);
    }, 1000)
    
  }

  getData = address => {
        
    const qs = `?client_id=XIVFA1NRVISYWF34PWGORXLFV4KVDGBXU35254B2GJ3NBQIN&client_secret=31H1Q2PQ10EUWB01F3V1AWAGVGKUAK3WTOWJMUZGQTMU0C3A&query=lunch&near=${address}&v=20170801&limit=3`
    const url = `https://api.foursquare.com/v2/venues/explore${qs}`;

    fetch(url)
      .then(results => results.json())
      .then(data => {
        //console.log(data.response);
        let refreshTable = !this.state.refreshTable;
        let res = data.response.groups ? data.response.groups[0] : {};
        this.setState({results: res, refreshTable: refreshTable});
      });
  };

  getDataMock(number){
      let n = 1;
      if (!isNaN(number)) { 
        n = number;
      }
      let num = parseInt(n);
      let response = {};
      let group = {};
      
      group.type = "Recommended Places";
      group.name = "recommended";
      group.items = [];

      for (let i = 1; i < 4; i++){
      let item = {};
          item.venue = {
              name: (i + num).toString(),
              categories: ["Restaurant " + (i + num).toString()],
              rating: i * i,
              url: "http://www.google.com"
          };
      group.items[i-1] = item;
      }
      response.groups = [group];

      return response;

    }

  render() {
    const {results, searchQuery, refreshTable} = this.state;

    return (<div>
      <Search
        searchQuery={searchQuery}
        onChange={this.onSearchQueryChange}
        search={this.onSearch}
      />
      
      <Table headings={results} refreshTable={refreshTable}/>
    </div>);
  }
}

export default Container;