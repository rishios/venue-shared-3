import React from 'react';
import './Table.css';

class Table extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            voteIndex: 0,
            participants: []
        }
    }

    handleTextChange = (evt) => {
      const value = evt.target.value;
      this.setState({name: value});
    }

    handleAddClick = (evt) => {
        let addRow = document.getElementById("addRow");
        let input = addRow.firstChild.firstChild;
        let voteIndex = this.state.voteIndex;
        let participants = this.state.participants;
        
        if (!input.value) { 
            input.className = "Table-input-error";
        } else {input.className = "Table-input";}

        if (voteIndex === 0) { 
            for (let i=1; i < addRow.childElementCount; i++){
                addRow.children[i].className = "Table-cell-error";
            }
        }

        if (!input.value || voteIndex === 0) {return; }
        
        participants.push({name: input.value, voteIndex: voteIndex});

        this.setState({participants: participants, voteIndex: 0});

        input.focus();
        input.value = "";
        for (let i =1; i < addRow.childElementCount; i++){
            let cell = addRow.children[i];
            cell.className = "Table-cell";
            cell.firstChild.className = "Table-hidden";
        }

        let headerRow = document.getElementById("headerRow");
        for (let i=1; i < headerRow.childElementCount; i++){
           headerRow.children[i].children[1].className = "Table-hidden";
        }

        let v1Votes = participants.filter(o => o.voteIndex === 1).length;
        let v2Votes = participants.filter(o => o.voteIndex === 2).length;
        let v3Votes = participants.filter(o => o.voteIndex === 3).length;
        if (v1Votes > v2Votes && v1Votes > v3Votes) {
            headerRow.children[1].children[1].className = "Table-visible";
        } else if (v2Votes > v1Votes && v2Votes > v3Votes) {
            headerRow.children[2].children[1].className = "Table-visible";
        } else if (v3Votes > v1Votes && v3Votes > v2Votes) {
            headerRow.children[3].children[1].className = "Table-visible";
        }
      
    }

    handleVote = (idx, evt) => {
        let addRow = document.getElementById("addRow");
        for (let i=1; i < addRow.childElementCount; i++){
            let cell = addRow.children[i];
            cell.className = "Table-cell";
            cell.firstChild.className = "Table-hidden";
        }

        let target = evt.target;
        target.className = "Table-cell-selected";
        target.firstChild.className = "Table-visible";

        this.setState({voteIndex: idx});
       
    }

    componentWillReceiveProps(nextProps){
        const { refreshTable } = this.props;
        if (nextProps.refreshTable !== refreshTable) {
            this.setState({participants: [], voteIndex: 0});

            let headerRow = document.getElementById("headerRow");
            if (headerRow) {
                for (let i=1; i < headerRow.childElementCount; i++){
                    headerRow.children[i].children[1].className = "Table-hidden";
                }
            }
            let addRow = document.getElementById("addRow");
            if (addRow) {
                let input = addRow.firstChild.firstChild;
                input.value = "";
                input.className = "Table-input";
                for (let i=1; i < addRow.childElementCount; i++){
                    let cell = addRow.children[i];
                    cell.className = "Table-cell";
                    cell.firstChild.className = "Table-hidden";
                }
            }

            let norecordfound = document.getElementById("norecordfound");
            if (norecordfound) { norecordfound.className =  "Table-visible";}
        }
    }

    render() {

      return (
          <div className="Table">
              {this.props.headings && this.props.headings.length > 0 ?
              <div>
              <table className="Table-table">
                  <thead>
                    <tr id="headerRow">
                        <th className="Table-heading-first" key="0">
                        <label className="Table-heading-first-label">Participants</label>
                        </th>
                        {this.props.headings.map(function (heading, idx) {
                            return (
                                <th className="Table-heading" key={idx +1}>
                                    <a className="Table-heading-a" href={heading.venue.url} target="_blank" rel="noopener noreferrer">{heading.venue.name}</a>
                                    <label className="Table-hidden">&#10004;</label>
                                    <br/>
                                    {heading.venue.categories && heading.venue.categories.length > 0 ?
                                    <label className="Table-heading-label-category">{heading.venue.categories[0].name}</label>
                                    :
                                    null
                                    }
                                    <br /> <br/>
                                    <label>{heading.venue.rating}</label>
                                </th>
                            );
                        })}
                    </tr>
                  </thead>
                  <tbody className="Table-body">
                    {this.state.participants && this.state.participants.length > 0 &&
                    this.state.participants.map(function (p, idx) {
                            return (
                                <tr key={idx}>
                                    <td className="Table-cell-first" key="0">
                                        <input className="Table-input" type="text" readOnly value={p.name}></input>
                                    </td>
                                    <td className={p.voteIndex !== 1 ? "Table-cell" : "Table-cell-selected"} key="1">
                                        <label className={p.voteIndex !== 1? "Table-hidden" : "Table-visible"}>&#10004;</label>
                                    </td>
                                    <td className={p.voteIndex !== 2 ? "Table-cell" : "Table-cell-selected"} key="2">
                                    <label className={p.voteIndex !== 2? "Table-hidden" : "Table-visible"}>&#10004;</label>
                                    </td>
                                    <td className={p.voteIndex !== 3 ? "Table-cell" : "Table-cell-selected"} key="3">
                                    <label className={p.voteIndex !== 3? "Table-hidden" : "Table-visible"}>&#10004;</label>
                                    </td>
                                </tr>
                            );
                        })
                    }

                    <tr id="addRow">
                        <td className="Table-cell-first" key="0">
                            <input autoFocus className="Table-input" type="text" placeholder="Type here" onChange={this.handleTextChange} />
                        </td>
                        <td className="Table-cell" key="1" onClick={this.handleVote.bind(this, 1)}>
                            <label className="Table-hidden">&#10004;</label>
                        </td>
                        <td className="Table-cell" key="2" onClick={this.handleVote.bind(this, 2)}>
                            <label className="Table-hidden">&#10004;</label>
                        </td>
                        <td className="Table-cell" key="3" onClick={this.handleVote.bind(this, 3)}>
                            <label className="Table-hidden">&#10004;</label>
                        </td>
                    </tr>

                  </tbody>
                  
              </table>
              <input type="button" className="Table-button" value="Add Participant" onClick={this.handleAddClick.bind(this)}></input>
              </div>
              :
              <div id="norecordfound" className="Table-hidden">
                  <label>No result found. Please search again...</label>
              </div>
              }
          </div>
      );
  }

}





export default Table;